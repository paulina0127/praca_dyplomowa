"""Models for Applications app."""

# Django
from django.db import models

# Third-party
from phonenumber_field.modelfields import PhoneNumberField

# Project
from apps.animals.models import Animal

# Local
from .utils.choices import ApplicationStatus


class Application(models.Model):
    status = models.CharField(max_length=50, choices=ApplicationStatus.choices)
    added_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = PhoneNumberField()
    animal = models.ForeignKey(
        to=Animal, on_delete=models.CASCADE, related_name="applications"
    )

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"Application {self.id}"
