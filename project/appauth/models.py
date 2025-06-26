# accounts/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser
from django.db import models
from appauth.managers import CustomUserManager

class CustomUser(AbstractUser):
    username = None  # remove username field
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    mobile = models.CharField(max_length=15)
    birth_date = models.DateField(null=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager() 

    def __str__(self):
        return f"{self.email} ({self.first_name} {self.last_name})"
# accounts/models.py
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

class OTPRecord(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    
    # OTP field renamed and validated
    otp = models.CharField(
        max_length=6,
        validators=[RegexValidator(r'^\d{6}$', 'OTP must be a 6-digit number')],
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    # OTP validity duration (in minutes)
    OTP_VALIDITY_MINUTES = 10

    def is_valid(self):
        """Returns True if OTP is not used and within validity window"""
        expiry_time = self.created_at + timezone.timedelta(minutes=self.OTP_VALIDITY_MINUTES)
        return not self.is_used and timezone.now() <= expiry_time

    def time_left(self):
        """Returns how many seconds are left before OTP expires"""
        expiry_time = self.created_at + timezone.timedelta(minutes=self.OTP_VALIDITY_MINUTES)
        remaining = expiry_time - timezone.now()
        return max(0, int(remaining.total_seconds()))

    def __str__(self):
        return f"OTP for {self.user.email} - {self.otp}"
