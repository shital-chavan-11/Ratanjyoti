from django.db import models

# ----- Main Categories -----
class MainCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)  # Gemstones, Rudraksha, Bracelets

    def __str__(self):
        return self.name

class GemstoneType(models.Model):
    name = models.CharField(max_length=100)  # Rashi Ratan, Vedic Ratan, Other Ratan
    count = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.name

class GemstoneSubCategory(models.Model):
    category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name='subcategories',null=True, blank=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


from django.db import models
from decimal import Decimal, ROUND_HALF_UP
class Gemstone(models.Model):
    sub_category = models.ForeignKey(GemstoneSubCategory, on_delete=models.CASCADE, related_name='gemstones')
    gemstone_type= models.ForeignKey(GemstoneType, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100,blank=True, null=True)  # e.g. Blue Sapphire
    origin = models.CharField(max_length=100)  # e.g. Ceylon, Bangkok
    origin_image = models.ImageField(upload_to='gemstones/origin/', blank=True, null=True)
    base_price_per_carat = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.origin})"

    def calculate_price(self, carat):
        result = self.base_price_per_carat * Decimal(carat)
        return result.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
 
class GemstoneVariant(models.Model):
    gemstone = models.ForeignKey(Gemstone, on_delete=models.CASCADE, related_name='variants')
    carat = models.DecimalField(max_digits=5, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.price = self.gemstone.calculate_price(self.carat)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.gemstone} - {self.carat} ct"


from django.db import models

class Rudraksha(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    origin = models.CharField(max_length=100)
    
    image1 = models.ImageField(upload_to='rudraksha/', blank=True, null=True)
    image2 = models.ImageField(upload_to='rudraksha/', blank=True, null=True)
    image3 = models.ImageField(upload_to='rudraksha/', blank=True, null=True)
    image4 = models.ImageField(upload_to='rudraksha/', blank=True, null=True)
    image5 = models.ImageField(upload_to='rudraksha/', blank=True, null=True)

    def __str__(self):
        return self.name


# ----- Bracelets -----
class Bracelet(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image1 = models.ImageField(upload_to='bracelets/', blank=True, null=True)
    image2 = models.ImageField(upload_to='bracelets/', blank=True, null=True)
    image3 = models.ImageField(upload_to='bracelets/', blank=True, null=True)
    image4 = models.ImageField(upload_to='bracelets/', blank=True, null=True)

    def __str__(self):
        return self.name
 