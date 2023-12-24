"""Admin file for Animals app."""


# Django
from django.contrib import admin

# Local
from .models import Animal
from .models import AnimalImage
from .models import Breed


@admin.register(Breed)
class BreedAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "species"]
    list_filter = ["species"]


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "species"]


@admin.register(AnimalImage)
class AnimalImageAdmin(admin.ModelAdmin):
    list_display = ["id"]
