from django.db import models

# Create your models here.
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from appauth.models import CustomUser  # Your custom user model
from django.utils import timezone

class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='likes')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    liked_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')

    def __str__(self):
        return f"{self.user.email} likes {self.content_object}"
from django.db import models
from appauth.models import CustomUser

class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='carts')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart #{self.id} - {self.user.email}"

from product.models import Gemstone
from product.models import Rudraksha
from product.models import Bracelet
from  product.models import GemstoneVariant
class CartItem(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='cart_items')

    gemstone = models.ForeignKey(Gemstone, on_delete=models.CASCADE, blank=True, null=True, related_name='cart_items')
    rudraksha = models.ForeignKey(Rudraksha, on_delete=models.CASCADE, blank=True, null=True, related_name='cart_items')

    bracelet = models.ForeignKey(Bracelet, on_delete=models.CASCADE, blank=True, null=True, related_name='bracelet_cart_items')
    gemstoneVariant = models.ForeignKey(GemstoneVariant, on_delete=models.CASCADE, blank=True, null=True, related_name='variant_cart_items')

    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'gemstone'], name='unique_user_gemstone'
            ),
            models.UniqueConstraint(
                fields=['user', 'rudraksha'], name='unique_user_rudraksha'
            ),
            models.UniqueConstraint(
                fields=['user', 'bracelet'], name='unique_user_bracelet'
            )
        ]
    def get_price(self):
        if self.gemstone and self.gemstoneVariant:
            return self.gemstoneVariant.price * self.quantity
        elif self.rudraksha:
            return self.rudraksha.price * self.quantity
        elif self.bracelet:
            return self.bracelet.price * self.quantity
        return 0

    def __str__(self):
        if self.gemstone:
            return f"{self.gemstone.name} x {self.quantity}"
        elif self.rudraksha:
            return f"{self.rudraksha.name} x {self.quantity}"
        elif self.bracelet:
            return f"{self.bracelet.name} x {self.quantity}"
        return "Empty Cart Item"
