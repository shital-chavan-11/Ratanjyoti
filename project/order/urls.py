from django.urls import path
from .views import   ToggleLikeView,UserLikesView,CartView,AddToCartView,DecreaseQuantityView,RemoveFromCartView,CartCountView,LikeCountView,IncreaseQuantityView

urlpatterns = [
      path('toggle-like/', ToggleLikeView.as_view(), name='toggle-like'),
        path('user/likes/', UserLikesView.as_view(), name='user-likes'),
         path('cart/', CartView.as_view(), name='api-cart'),
    path('add/', AddToCartView.as_view(), name='api-add-to-cart'),
    path('decrease/', DecreaseQuantityView.as_view(), name='api-decrease-quantity'),
    path('remove/', RemoveFromCartView.as_view(), name='api-remove-from-cart'),
    path('count/', CartCountView.as_view(), name='api-cart-count'),
    path('likes/count/', LikeCountView.as_view()),
    path('increase/', IncreaseQuantityView.as_view(), name='increase-cart-item'),


]
