from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import MainCategory

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Gemstone, GemstoneVariant, GemstoneSubCategory
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from .models import GemstoneType, GemstoneSubCategory 
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
from .models import MainCategory, GemstoneType, GemstoneSubCategory
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import Gemstone, GemstoneSubCategory
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from rest_framework.views import APIView
from product.models import GemstoneType, GemstoneSubCategory, MainCategory
import json

@method_decorator(csrf_exempt, name='dispatch')
class AddGemstoneDataView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized. Only superusers allowed.'}, status=403)

        try:
            data = json.loads(request.body)
            gemstone_type_name = data.get('gemstone_type', {}).get('name')
            subcategory_name = data.get('subcategory', {}).get('name')
            category_id = data.get('subcategory', {}).get('category')

            if not (gemstone_type_name and subcategory_name and category_id):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Get or create GemstoneType and update count
            gemstone_type, created_type = GemstoneType.objects.get_or_create(name=gemstone_type_name)
            if not created_type:
                gemstone_type.count += 1
                gemstone_type.save()

            # Get MainCategory instance
            try:
                main_category = MainCategory.objects.get(id=category_id)
            except MainCategory.DoesNotExist:
                return JsonResponse({'error': 'Invalid MainCategory ID'}, status=404)

            # Get or create GemstoneSubCategory
            subcategory, created_sub = GemstoneSubCategory.objects.get_or_create(
                name=subcategory_name,
                category=main_category
            )

            return JsonResponse({
                'message': 'GemstoneType and SubCategory processed successfully',
                'gemstone_type': gemstone_type.name,
                'gemstone_type_count': gemstone_type.count,
                'subcategory': subcategory.name,
                'main_category': main_category.name
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class GemstoneCreateView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized. Only superusers allowed.'}, status=403)

        name = request.POST.get('name')
        origin = request.POST.get('origin')
        base_price = request.POST.get('base_price_per_carat')
        origin_image = request.FILES.get('origin_image')

        # 1. Match name in subcategory
        matching_subcategories = GemstoneSubCategory.objects.filter(name__iexact=name)

        if matching_subcategories.count() == 0:
            return JsonResponse({'error': 'No subcategory found with this name.'}, status=400)
        elif matching_subcategories.count() > 1:
            return JsonResponse({'error': 'Multiple subcategories with this name found. Cannot determine which to use.'}, status=400)

        sub_category = matching_subcategories.first()

        # 2. Check if gemstone with same name and subcategory exists
        existing_gemstones = Gemstone.objects.filter(name__iexact=name, sub_category=sub_category)

        if existing_gemstones.exists():
            # If exists, check if the origin is already used
            if existing_gemstones.filter(origin__iexact=origin).exists():
                return JsonResponse({'error': 'Gemstone with this name and origin already exists in this subcategory.'}, status=400)
            
            # Else, add new gemstone with same name + subcategory but new origin
            gemstone = Gemstone.objects.create(
                sub_category=sub_category,
                name=name,
                origin=origin,
                base_price_per_carat=base_price,
                origin_image=origin_image
            )
            return JsonResponse({
                'message': 'New origin added to existing gemstone name',
                'id': gemstone.id
            })

        # 3. No gemstone with this name found — create new
        gemstone = Gemstone.objects.create(
            sub_category=sub_category,
            name=name,
            origin=origin,
            base_price_per_carat=base_price,
            origin_image=origin_image
        )

        return JsonResponse({
            'message': 'New gemstone created successfully',
            'id': gemstone.id
        })

from decimal import Decimal, InvalidOperation
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.http import JsonResponse
import json
from product.models import Gemstone, GemstoneVariant  # make sure this import is present

@method_decorator(csrf_exempt, name='dispatch')
class GemstoneVariantCreateView(APIView):
    def post(self, request):
        # Authorization check
        if not request.user.is_authenticated or not request.user.is_superuser:
            return JsonResponse({'error': 'Unauthorized. Only superusers allowed.'}, status=403)

        # Parse JSON body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        name = data.get('name')
        origin = data.get('origin')
        carat = data.get('carat')

        print("DEBUG name:", repr(name))
        print("DEBUG origin:", repr(origin))
        print("DEBUG carat:", carat)

        if not name or not origin or not carat:
            return JsonResponse({'error': 'Missing name, origin, or carat'}, status=400)

        # Try to find the gemstone
        try:
            gemstone = Gemstone.objects.get(
                name__iexact=name.strip(),
                origin__iexact=origin.strip()
            )
        except Gemstone.DoesNotExist:
            # Debug all entries for trace
            print("DEBUG - Available gemstones:")
            for g in Gemstone.objects.all():
                print("->", repr(g.name), repr(g.origin))
            return JsonResponse({'error': 'Gemstone not found with given name and origin'}, status=404)

        # Parse carat as decimal
        try:
            carat = Decimal(carat)
        except (ValueError, InvalidOperation):
            return JsonResponse({'error': 'Invalid carat value'}, status=400)

        # Create variant
        variant = GemstoneVariant.objects.create(
            gemstone=gemstone,
            carat=carat,
        )

        return JsonResponse({
            'message': 'Variant created successfully',
            'gemstone': variant.gemstone.name,
            'origin': variant.gemstone.origin,
            'carat': str(variant.carat),
            'price': str(variant.price)
        })
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.http import JsonResponse
from product.models import Gemstone

@method_decorator(csrf_exempt, name='dispatch')
class GetExactGemstoneView(APIView):
    def get(self, request):
        name = request.GET.get('name')
        origin = request.GET.get('origin')

        if not name or not origin:
            return JsonResponse({'error': 'Missing name or origin'}, status=400)

        try:
            gemstone = Gemstone.objects.get(
                name__iexact=name.strip(),
                origin__iexact=origin.strip()
            )
        except Gemstone.DoesNotExist:
            return JsonResponse({'error': 'Gemstone not found'}, status=404)

        variants = gemstone.variants.all().values('carat', 'price')

        return JsonResponse({
            'name': gemstone.name,
            'origin': gemstone.origin,
            'base_price_per_carat': str(gemstone.base_price_per_carat),
            'variants': list(variants)
        })
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from django.http import JsonResponse
from decimal import Decimal, InvalidOperation
from product.models import Gemstone, GemstoneVariant

@method_decorator(csrf_exempt, name='dispatch')
class GetGemstoneVariantView(APIView):
    def get(self, request):
        name = request.GET.get('name')
        origin = request.GET.get('origin')
        carat = request.GET.get('carat')

        if not name or not origin or not carat:
            return JsonResponse({'error': 'Missing name, origin, or carat'}, status=400)

        try:
            carat_decimal = Decimal(carat)
        except (InvalidOperation, ValueError):
            return JsonResponse({'error': 'Invalid carat value'}, status=400)

        try:
            gemstone = Gemstone.objects.get(
                name__iexact=name.strip(),
                origin__iexact=origin.strip()
            )
        except Gemstone.DoesNotExist:
            return JsonResponse({'error': 'Gemstone not found'}, status=404)

        try:
            variant = GemstoneVariant.objects.get(
                gemstone=gemstone,
                carat=carat_decimal
            )
        except GemstoneVariant.DoesNotExist:
            return JsonResponse({'error': 'Gemstone variant not found'}, status=404)

        # Get the image URL, or None if not set
        origin_image_url = request.build_absolute_uri(gemstone.origin_image.url) if gemstone.origin_image else None

        return JsonResponse({
            'name': gemstone.name,
            'origin': gemstone.origin,
            'carat': str(variant.carat),
            'price': str(variant.price),
            'origin_image': origin_image_url
        })





class CategoryCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_superuser:
            return Response({"error": "You do not have permission to add categories."}, status=status.HTTP_403_FORBIDDEN)

        name = request.data.get("name", "").strip()
        if not name:
            return Response({"error": "Category name is required."}, status=status.HTTP_400_BAD_REQUEST)

        category = MainCategory.objects.create(name=name)
        return Response({
            "message": "Category created successfully",
            "category_id": category.id,
            "category_name": category.name
        }, status=status.HTTP_201_CREATED)
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Rudraksha

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Rudraksha

class AddRudrakshaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user.is_superuser:
            return Response({'error': 'Only admin users can perform this action.'}, status=status.HTTP_403_FORBIDDEN)

        try:
            name = request.data.get('name', '').strip()
            price = request.data.get('price')
            origin = request.data.get('origin', '').strip()

            image1 = request.FILES.get('image1')
            image2 = request.FILES.get('image2')
            image3 = request.FILES.get('image3')
            image4 = request.FILES.get('image4')
            image5 = request.FILES.get('image5')

            # Ensure minimum 3 images are present
            if not all([image1, image2]):
                return Response({'error': 'At least 3 images (image1, image2, image3) are required.'}, status=status.HTTP_400_BAD_REQUEST)

            rudraksha = Rudraksha.objects.create(
                name=name,
                price=price,
                origin=origin,
                image1=image1,
                image2=image2,
                image3=image3,
                image4=image4,
                image5=image5
            )

            return Response({'success': f'Rudraksha "{rudraksha.name}" added successfully.'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rudraksha

class GetSpecificRudrakshaView(APIView):
    permission_classes = []  # public access

    def get(self, request, mukhi_name):
        if mukhi_name:
            # Convert hyphens to spaces for proper matching
            mukhi_name = mukhi_name.replace('-', ' ')
        rudrakshas = Rudraksha.objects.filter(name__icontains=mukhi_name)
        if not rudrakshas.exists():
            return Response({'message': 'No Rudraksha found with this name.'}, status=status.HTTP_404_NOT_FOUND)

        data = []
        for rudraksha in rudrakshas:
            data.append({
                'id': rudraksha.id,
                'name': rudraksha.name,
                'price': rudraksha.price,
                'origin': rudraksha.origin,
                'image1': request.build_absolute_uri(rudraksha.image1.url) if rudraksha.image1 else None,
                'image2': request.build_absolute_uri(rudraksha.image2.url) if rudraksha.image2 else None,
                'image3': request.build_absolute_uri(rudraksha.image3.url) if rudraksha.image3 else None,
                'image4': request.build_absolute_uri(rudraksha.image4.url) if rudraksha.image4 else None,
                'image5': request.build_absolute_uri(rudraksha.image5.url) if rudraksha.image5 else None,
            })

        return Response({'rudrakshas': data}, status=status.HTTP_200_OK)
class GetRudrakshaListView(APIView):
    permission_classes = []

    def get(self, request):
        name = request.query_params.get('name')  # Get the 'name' from query parameter

        if name:
            rudrakshas = Rudraksha.objects.filter(name__iexact=name)
  # Case-insensitive partial match
        else:
            rudrakshas = Rudraksha.objects.all()

        data = []
        for rudraksha in rudrakshas:
            data.append({
                'id': rudraksha.id,
                'name': rudraksha.name,
                'price': rudraksha.price,
                'origin': rudraksha.origin,
                'image1': request.build_absolute_uri(rudraksha.image1.url) if rudraksha.image1 else None,
                'image2': request.build_absolute_uri(rudraksha.image2.url) if rudraksha.image2 else None,
                'image3': request.build_absolute_uri(rudraksha.image3.url) if rudraksha.image3 else None,
                'image4': request.build_absolute_uri(rudraksha.image4.url) if rudraksha.image4 else None,
                'image5': request.build_absolute_uri(rudraksha.image5.url) if rudraksha.image5 else None,
            })

        return Response({'rudrakshas': data}, status=status.HTTP_200_OK)
# views.py
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Rudraksha  # Make sure this is your model

@method_decorator(csrf_exempt, name='dispatch')
class DeleteRudrakshaByNameView(APIView):
    def delete(self, request):
        if not request.user.is_superuser:
            return JsonResponse({'error': 'Only superusers can delete rudraksha.'}, status=403)

        name = request.GET.get('name')
        if not name:
            return JsonResponse({'error': 'Name parameter is required'}, status=400)

        deleted_count, _ = Rudraksha.objects.filter(name__iexact=name).delete()

        if deleted_count == 0:
            return JsonResponse({'message': f'No rudraksha found with name "{name}"'}, status=404)

        return JsonResponse({'message': f'Rudraksha "{name}" deleted successfully'})

# views.py
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from .models import Bracelet

@method_decorator(csrf_exempt, name='dispatch')
class AddBraceletView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if not request.user.is_superuser:
            return JsonResponse({'error': 'Only superusers can add bracelets.'}, status=403)

        name = request.POST.get('name')
        price = request.POST.get('price')

        image1 = request.FILES.get('image1')
        image2 = request.FILES.get('image2')
        image3 = request.FILES.get('image3')
        image4 = request.FILES.get('image4')

        bracelet = Bracelet.objects.create(
            name=name,
            price=price,
            image1=image1,
            image2=image2,
            image3=image3,
            image4=image4
        )

        return JsonResponse({'message': 'Bracelet added successfully', 'bracelet_id': bracelet.id})
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bracelet

class GetBraceletByNameView(APIView):
    def get(self, request, name, *args, **kwargs):
        try:
            # Filter the bracelet with exact name or partial match
            bracelets = Bracelet.objects.filter(name__icontains=name)

            if not bracelets.exists():
                return Response({"message": "No bracelets found with the given name."}, status=status.HTTP_404_NOT_FOUND)

            data = []
            for bracelet in bracelets:
                data.append({
                    'id': bracelet.id,
                    'name': bracelet.name,
                    'price': str(bracelet.price),
                    'image1': request.build_absolute_uri(bracelet.image1.url) if bracelet.image1 else None,
                    'image2': request.build_absolute_uri(bracelet.image2.url) if bracelet.image2 else None,
                    'image3': request.build_absolute_uri(bracelet.image3.url) if bracelet.image3 else None,
                    'image4': request.build_absolute_uri(bracelet.image4.url) if bracelet.image4 else None,
                })

            return Response({'bracelets': data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bracelet  # Make sure you import your Bracelet model

class GetAllBraceletsView(APIView):
    permission_classes = []  # Add permission if needed (e.g., IsAuthenticated)

    def get(self, request):
        bracelets = Bracelet.objects.all()

        data = []
        for bracelet in bracelets:
            data.append({
                'id': bracelet.id,
                'name': bracelet.name,
                'price': str(bracelet.price),
                'image1': request.build_absolute_uri(bracelet.image1.url) if bracelet.image1 else None,
                'image2': request.build_absolute_uri(bracelet.image2.url) if bracelet.image2 else None,
                'image3': request.build_absolute_uri(bracelet.image3.url) if bracelet.image3 else None,
                'image4': request.build_absolute_uri(bracelet.image4.url) if bracelet.image4 else None,
            })

        return Response({'bracelets': data}, status=status.HTTP_200_OK)
# views.py
from django.http import JsonResponse
from django.views import View
from django.db.models import Q
from rest_framework.views import APIView

class GlobalSearchView(APIView):
    def get(self, request):
        query = request.GET.get('q', '').strip()
        if not query:
            return JsonResponse({'results': []})

        results = []

        # --- Gemstone Search ---
        gemstone_qs = Gemstone.objects.filter(
            Q(sub_category__name__icontains=query) |
            Q(gemstone_type__name__icontains=query) |
            Q(origin__icontains=query)
        ).select_related('sub_category', 'gemstone_type')[:10]

        for gem in gemstone_qs:
         results.append({
        'name': gem.name,  # ✅ Use gemstone name directly
        'category': 'Gemstone',
        'price': float(gem.base_price_per_carat),
        'image': gem.origin_image.url if gem.origin_image else '',
        'origin': gem.origin
    })


        # --- Rudraksha Search ---
        rudraksha_qs = Rudraksha.objects.filter(
            Q(name__icontains=query) |
            Q(origin__icontains=query)
        )[:10]

        for rudra in rudraksha_qs:
            results.append({
                'name': rudra.name,
                'category': 'Rudraksha',
                'price': float(rudra.price),
                'image': rudra.image1.url if rudra.image1 else '',
                'origin': rudra.origin  # ✅ Added here
            })

        # --- Bracelet Search ---
        bracelet_qs = Bracelet.objects.filter(
            Q(name__icontains=query)
        )[:10]

        for bracelet in bracelet_qs:
            results.append({
                'name': bracelet.name,
                'category': 'Bracelet',
                'price': float(bracelet.price),
                'image': bracelet.image1.url if bracelet.image1 else ''
                # ❌ No origin field here
            })

        return JsonResponse({'results': results})
