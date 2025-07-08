from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
from django.core.mail import send_mail
from django.conf import settings
import random
from django.utils import timezone
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from appauth.models import CustomUser, OTPRecord  # Make sure these are imported

def generate_otp():
    return str(random.randint(100000, 999999))

@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)

            first_name = data.get('first_name', '').strip()
            last_name = data.get('last_name', '').strip()
            birth_date = data.get('birth_date')
            email = data.get('email')
            mobile = data.get('mobile')
            password = data.get('password')
            confirm_password = data.get('confirm_password')

            # Check all fields
            if not all([first_name, last_name, birth_date, email, mobile, password, confirm_password]):
                return JsonResponse({'error': 'All fields are required'}, status=400)

            if password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)

            if CustomUser.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists'}, status=400)

            # Create user (inactive until OTP verification)
            user = CustomUser.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                birth_date=birth_date,
                email=email,
                mobile=mobile,
                is_active=False,
                password=password
            )

            # Generate and store OTP
            otp = generate_otp()
            OTPRecord.objects.create(user=user, otp=otp)

            # Send email
            send_mail(
                subject="Verify Your Email - OTP Inside",
                message=f"Your OTP is: {otp}. It is valid for 10 minutes.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
            )

            # Store session for OTP verification step
            request.session['user_email'] = email
            request.session.modified = True

            return JsonResponse({'message': 'User registered. OTP sent to email.'}, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)


@method_decorator(csrf_exempt, name='dispatch')
class OTPVerifyView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            otp_input = data.get('otp')

            if not email or not otp_input:
                return JsonResponse({'error': 'Email and OTP are required.'}, status=400)

            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'User not found.'}, status=404)

            otp_record = OTPRecord.objects.filter(user=user, is_used=False).order_by('-created_at').first()

            if not otp_record:
                return JsonResponse({'error': 'No active OTP found. Please request a new one.'}, status=400)

            if not otp_record.is_valid():
                # Expired OTP, generate and send new one
                new_otp = generate_otp()
                OTPRecord.objects.create(user=user, otp=new_otp)

                send_mail(
                    subject="New OTP for Verification",
                    message=f"Your new OTP is: {new_otp}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                )
                return JsonResponse({'message': 'OTP expired. New OTP sent to your email.'}, status=400)

            if otp_record.otp != otp_input:
                return JsonResponse({'error': 'Invalid OTP.'}, status=400)

            # OTP is valid
            otp_record.is_used = True
            otp_record.save()
            user.is_verified = True
            user.is_active = True
            user.save()

            return JsonResponse({'message': 'OTP verified successfully. User activated.'}, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
import json

from .models import CustomUser, OTPRecord
from .views import generate_otp  # reuse your existing function


@method_decorator(csrf_exempt, name='dispatch')
class ResendOTPView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({'error': 'Email is required.'}, status=400)

            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'User not found.'}, status=404)

            if user.is_active and user.is_verified:
                return JsonResponse({'error': 'User is already verified.'}, status=400)

            # Invalidate previous OTPs
            OTPRecord.objects.filter(user=user, is_used=False).update(is_used=True)

            # Generate new OTP
            new_otp = generate_otp()
            OTPRecord.objects.create(user=user, otp=new_otp)

            # Send via email
            send_mail(
                subject="Your New OTP - Verify Your Email",
                message=f"Your new OTP is: {new_otp}. It is valid for 10 minutes.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
            )

            return JsonResponse({'message': 'New OTP sent successfully.'}, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser

class SignInView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Allow superusers even if not verified
            if user.is_verified or user.is_superuser:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                     'is_superuser': user.is_superuser,
                    'message': 'Login successful'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Account not verified. Please verify your email.'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'error': 'Invalid credentials.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({'error': 'Refresh token is required.'}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

import random
from django.utils import timezone
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import CustomUser, OTPRecord


class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Generate 6-digit OTP
        otp = str(random.randint(100000, 999999))

        # Save OTP to DB
        OTPRecord.objects.create(user=user, otp=otp)

        # Send Email
        send_mail(
            subject='Your OTP for Password Reset',
            message=f'Your OTP is: {otp}',
            from_email='noreply@example.com',
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent to your email.'}, status=status.HTTP_200_OK)


class ResetPasswordWithOTPView(APIView):

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('new_password')

        if not all([email, otp, new_password]):
            return Response({'error': 'Email, OTP, and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            otp_record = OTPRecord.objects.filter(user=user, otp=otp, is_used=False).latest('created_at')
        except OTPRecord.DoesNotExist:
            return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)

        if not otp_record.is_valid():
            return Response({'error': 'OTP expired or already used.'}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Update password
        user.set_password(new_password)
        user.save()

        # ✅ Mark OTP as used
        otp_record.is_used = True
        otp_record.save()

        return Response({'message': 'Password reset successfully.'}, status=status.HTTP_200_OK)
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated

 
@method_decorator(csrf_exempt, name='dispatch')
class EditProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return JsonResponse({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'birth_date': user.birth_date,
            'email': user.email,
            'mobile': user.mobile,
        })

    def patch(self, request):
        try:
            data = json.loads(request.body)
            user = request.user

            if 'email' in data and data['email'] != user.email:
                return JsonResponse({'error': 'Email cannot be changed.'}, status=400)

            user.first_name = data.get('first_name', user.first_name).strip()
            user.last_name = data.get('last_name', user.last_name).strip()
            user.birth_date = data.get('birth_date', user.birth_date)
            user.mobile = data.get('mobile', user.mobile).strip()

            user.save()

            return JsonResponse({
                'message': 'Profile updated successfully.',
                'user': {
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'birth_date': user.birth_date,
                    'email': user.email,
                    'mobile': user.mobile,
                }
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Server error: {str(e)}'}, status=500)
