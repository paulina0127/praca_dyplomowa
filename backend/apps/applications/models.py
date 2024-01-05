"""Models for Applications app."""

# Django
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Third-party
from phonenumber_field.modelfields import PhoneNumberField

# Project
from apps.animals.models import Animal
from apps.animals.utils.choices import AnimalSpecies

# Local
from .utils.choices import ApplicationStatus


class Application(models.Model):
    status = models.CharField(
        max_length=50,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.SUBMTTED,
    )
    added_at = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField()
    has_animals = ArrayField(
        models.CharField(max_length=50, choices=AnimalSpecies.choices),
        blank=True,
        default=list,
    )
    has_children = models.BooleanField()
    medical_ability = models.BooleanField()
    active = models.BooleanField()
    animal = models.ForeignKey(
        to=Animal, on_delete=models.CASCADE, related_name="applications"
    )

    class Meta:
        ordering = ["-added_at"]
        verbose_name = "Aplikacja"
        verbose_name_plural = "Aplikacje"

    def __str__(self):
        return f"Aplikacja nr {self.id}"
