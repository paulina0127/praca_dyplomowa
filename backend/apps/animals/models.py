"""Models for Animals app."""

# Django
from django.contrib.postgres.fields import ArrayField
from django.db import models

# Project
from apps.profiles.models import Shelter

# Local
from .utils.choices import AnimalAge
from .utils.choices import AnimalEnergyLevel
from .utils.choices import AnimalSex
from .utils.choices import AnimalSize
from .utils.choices import AnimalSpecies
from .utils.choices import AnimalStatus
from .utils.choices import AnimalTemperament


class Breed(models.Model):
    name = models.CharField(max_length=255)
    species = models.CharField(max_length=50, choices=AnimalSpecies.choices)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name}"


class Animal(models.Model):
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=AnimalStatus.choices)
    added_at = models.DateTimeField(auto_now_add=True)
    sex = models.CharField(max_length=15, choices=AnimalSex.choices)
    size = models.CharField(max_length=15, choices=AnimalSize.choices)
    species = models.CharField(max_length=50, choices=AnimalSpecies.choices)
    breed = models.ForeignKey(
        to=Breed, on_delete=models.SET_NULL, null=True, related_name="animals"
    )
    age = models.CharField(max_length=15, choices=AnimalAge.choices)
    spayed_neutered = models.BooleanField()
    description = models.TextField(blank=True)
    temperament = ArrayField(
        models.CharField(max_length=100, choices=AnimalTemperament.choices),
        blank=True,
        default=list,
    )
    energy_level = models.CharField(
        max_length=15, choices=AnimalEnergyLevel.choices, blank=True
    )
    accepts_children = models.BooleanField(blank=True, null=True)
    accepts_animals = ArrayField(
        models.CharField(max_length=50, choices=AnimalSpecies.choices),
        blank=True,
        default=list,
    )
    trained = models.BooleanField(blank=True, null=True)
    medical_needs = ArrayField(models.TextField(), blank=True, default=list)
    activities = ArrayField(models.TextField(), blank=True, default=list)
    shelter = models.ForeignKey(
        to=Shelter, on_delete=models.CASCADE, related_name="animals"
    )

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name}"


class AnimalImage(models.Model):
    name = models.CharField(max_length=255)
    animal = models.ForeignKey(
        to=Animal, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="animals/images")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.name}"
