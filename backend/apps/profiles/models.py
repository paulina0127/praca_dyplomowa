"""Models for Profiles app."""

# Django
from django.contrib.auth import get_user_model
from django.db import models

# Third-party
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()


class Shelter(models.Model):
    name = models.CharField(max_length=255)
    nip = models.CharField(max_length=10, unique=True)
    krs = models.CharField(max_length=15, unique=True, blank=True)
    email = models.EmailField(blank=True)
    phone_number = PhoneNumberField()
    website = models.URLField(blank=True)
    street_address = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=6)
    city = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="shelters/images", blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    user = models.OneToOneField(
        to=User,
        related_name="shelter",
        on_delete=models.CASCADE,
    )

    class Meta:
        ordering = ["id"]
        verbose_name = "Schronisko"
        verbose_name_plural = "Schroniska"

    def __str__(self) -> str:
        return f"{self.name}"
