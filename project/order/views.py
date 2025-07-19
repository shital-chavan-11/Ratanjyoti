from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.contenttypes.models import ContentType
from .models import Like
from product.models import Gemstone, Rudraksha, Bracelet

@method_decorator(csrf_exempt, name='dispatch')
class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        model_name = request.data.get('model')
        object_id = request.data.get('id')

        model_map = {
            'gemstone': Gemstone,
            'rudraksha': Rudraksha,
            'bracelet': Bracelet,
        }

        if model_name not in model_map:
            return Response({'error': 'Invalid model name'}, status=status.HTTP_400_BAD_REQUEST)

        model = model_map[model_name]
        try:
            obj = model.objects.get(pk=object_id)
        except model.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        content_type = ContentType.objects.get_for_model(model)
        like, created = Like.objects.get_or_create(
            user=request.user,
            content_type=content_type,
            object_id=object_id
        )

        if not created:
            like.delete()
            message = 'Unliked'
        else:
            message = 'Liked'

        # Get all liked item ids for this model
        liked_ids = Like.objects.filter(
            user=request.user,
            content_type=content_type
        ).values_list('object_id', flat=True)

        return Response({
            'message': message,
            'liked_items': list(liked_ids)
        }, status=status.HTTP_200_OK)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Like
from product.models import Rudraksha, Gemstone, Bracelet

class UserLikesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        likes = Like.objects.filter(user=user)
        liked_items = []

        for like in likes:
            obj = like.content_object
            model_name = like.content_type.model

            if hasattr(obj, 'id') and hasattr(obj, 'name'):
                item_data = {
                    'id': obj.id,
                    'name': obj.name,
                    'type': model_name,
                    'liked_at': like.liked_at.strftime('%Y-%m-%d %H:%M:%S'),
                }

                # ✅ Price
                if hasattr(obj, 'price'):
                    item_data['price'] = obj.price

                # ✅ Image logic (check multiple image fields)
                image_url = None
                image_fields = ['image', 'image1', 'image2', 'image3', 'image4', 'image5']

                for field in image_fields:
                    if hasattr(obj, field):
                        image_field = getattr(obj, field)
                        if image_field:
                            image_url = request.build_absolute_uri(image_field.url)
                            break

                if image_url:
                    item_data['image'] = image_url

                # ✅ Extra model-specific fields
                if model_name == 'gemstone' and hasattr(obj, 'origin'):
                    item_data['origin'] = obj.origin
                elif model_name == 'rudraksha' and hasattr(obj, 'mukhi'):
                    item_data['mukhi'] = obj.mukhi
                elif model_name == 'bracelet' and hasattr(obj, 'material'):
                    item_data['material'] = obj.material

                liked_items.append(item_data)

        return Response({
            'likes': liked_items
        })
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.contenttypes.models import ContentType
from .models import Like

class LikeCountView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, model_name, object_id):
        try:
            content_type = ContentType.objects.get(model=model_name.lower())
            count = Like.objects.filter(content_type=content_type, object_id=object_id).count()
            return Response({'like_count': count})
        except ContentType.DoesNotExist:
            return Response({'error': 'Invalid model name'}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import CartItem
from product.models import Gemstone, Rudraksha, Bracelet,GemstoneVariant
from .models import Cart
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import CartItem
from product.models import Gemstone, Rudraksha, Bracelet

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import CartItem
from product.models import Gemstone, GemstoneVariant, Rudraksha, Bracelet


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        total_items = sum(item.quantity for item in items)

        cart_data = {
            'total_items': total_items,
            'items': []
        }

        for item in items:
            product = None
            image_url = None
            price = 0
            total_price = 0
            variant = None  # Ensure variant is always defined

            # GEMSTONE
            if item.gemstone:
                product = item.gemstone
                variant = getattr(item, 'gemstone_variant', None)

                if variant:
                    price = variant.price
                else:
                    price = product.base_price_per_carat  # fallback

                total_price = price * item.quantity

                if product.origin_image:
                    image_url = request.build_absolute_uri(product.origin_image.url)

            # RUDRAKSHA
            elif item.rudraksha:
                product = item.rudraksha
                price = product.price
                total_price = price * item.quantity

                for field in ['image1', 'image2', 'image3', 'image4', 'image5']:
                    image = getattr(product, field)
                    if image:
                        image_url = request.build_absolute_uri(image.url)
                        break

            # BRACELET
            elif item.bracelet:
                product = item.bracelet
                price = product.price
                total_price = price * item.quantity

                for field in ['image1', 'image2', 'image3', 'image4']:
                    image = getattr(product, field)
                    if image:
                        image_url = request.build_absolute_uri(image.url)
                        break

            if not product:
                continue  # skip invalid cart item

            cart_data['items'].append({
                'product_type': product.__class__.__name__,
                'product_id': product.id,
                'product_name': product.name,
                'quantity': item.quantity,
                'carat': str(variant.carat) if variant else None,
                'price': str(variant.price) if variant else str(price),
                'total_price': str(total_price),
                'variant_id': variant.id if variant else None,
                'image': image_url,
            })

        return Response(cart_data, status=status.HTTP_200_OK)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_type = request.data.get('product_type')
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')  # Add this line
        quantity = int(request.data.get('quantity', 1))

        if product_type == 'Gemstone':
            gemstone = get_object_or_404(Gemstone, id=product_id)
            if not variant_id:
                return Response({'error': 'variant_id is required for Gemstone'}, status=400)
            variant = get_object_or_404(GemstoneVariant, id=variant_id, gemstone=gemstone)
            filter_kwargs = {'gemstone': gemstone, 'gemstoneVariant': variant}
        elif product_type == 'Rudraksha':
            product = get_object_or_404(Rudraksha, id=product_id)
            filter_kwargs = {'rudraksha': product}
        elif product_type == 'Bracelet':
            product = get_object_or_404(Bracelet, id=product_id)
            filter_kwargs = {'bracelet': product}
        else:
            return Response({'error': 'Invalid product type'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user, defaults={'quantity': quantity}, **filter_kwargs
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        return Response({'message': 'Item added to cart'}, status=status.HTTP_200_OK)

class IncreaseQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_type = request.data.get('product_type')
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')  # Important for Gemstone

        if product_type == 'Gemstone':
            gemstone = get_object_or_404(Gemstone, id=product_id)
            variant = get_object_or_404(GemstoneVariant, id=variant_id, gemstone=gemstone)
            filter_kwargs = {'gemstone': gemstone, 'gemstone_variant': variant}
            price = variant.price
        elif product_type == 'Rudraksha':
            product = get_object_or_404(Rudraksha, id=product_id)
            filter_kwargs = {'rudraksha': product}
            price = product.price
        elif product_type == 'Bracelet':
            product = get_object_or_404(Bracelet, id=product_id)
            filter_kwargs = {'bracelet': product}
            price = product.price
        else:
            return Response({'error': 'Invalid product type'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item, created = CartItem.objects.get_or_create(user=request.user, defaults={'quantity': 1}, **filter_kwargs)

        if not created:
            cart_item.quantity += 1
            cart_item.save()

        total_price = cart_item.quantity * price

        return Response({
            'message': 'Quantity increased',
            'quantity': cart_item.quantity,
            'total_price': total_price
        }, status=status.HTTP_200_OK)
class DecreaseQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_type = request.data.get('product_type')
        product_id = request.data.get('product_id')
        variant_id = request.data.get('variant_id')

        if product_type == 'Gemstone':
            gemstone = get_object_or_404(Gemstone, id=product_id)
            variant = get_object_or_404(GemstoneVariant, id=variant_id, gemstone=gemstone)
            filter_kwargs = {'gemstone': gemstone, 'gemstone_variant': variant}
            price = variant.price
        elif product_type == 'Rudraksha':
            product = get_object_or_404(Rudraksha, id=product_id)
            filter_kwargs = {'rudraksha': product}
            price = product.price
        elif product_type == 'Bracelet':
            product = get_object_or_404(Bracelet, id=product_id)
            filter_kwargs = {'bracelet': product}
            price = product.price
        else:
            return Response({'error': 'Invalid product type'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = get_object_or_404(CartItem, user=request.user, **filter_kwargs)

        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
            total_price = cart_item.quantity * price
            return Response({
                'message': 'Quantity decreased',
                'quantity': cart_item.quantity,
                'total_price': total_price
            }, status=status.HTTP_200_OK)
        else:
            cart_item.delete()
            return Response({
                'message': 'Item removed',
                'quantity': 0,
                'total_price': 0
            }, status=status.HTTP_200_OK)


class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_type = request.data.get('product_type')
        product_id = request.data.get('product_id')

        if product_type == 'Gemstone':
            product = get_object_or_404(Gemstone, id=product_id)
            filter_kwargs = {'gemstone': product}
        elif product_type == 'Rudraksha':
            product = get_object_or_404(Rudraksha, id=product_id)
            filter_kwargs = {'rudraksha': product}
        elif product_type == 'Bracelet':
            product = get_object_or_404(Bracelet, id=product_id)
            filter_kwargs = {'bracelet': product}
        else:
            return Response({'error': 'Invalid product type'}, status=status.HTTP_400_BAD_REQUEST)

        cart_item = get_object_or_404(CartItem, user=request.user, **filter_kwargs)
        cart_item.delete()

        return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)


class CartCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        count = sum(item.quantity for item in CartItem.objects.filter(user=request.user))
        return Response({'cart_count': count}, status=status.HTTP_200_OK)
