# accounts/urls.py

from django.urls import path
from .views import SignUpView, OTPVerifyView, SignInView, ResetPasswordWithOTPView, ForgotPasswordView,  ResendOTPView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify-otp'),
    path('signin/', SignInView.as_view(), name='signin'),
     path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordWithOTPView.as_view(), name='reset-password'),
    path('resend-otp/', ResendOTPView.as_view(), name='resend-otp'),
]

