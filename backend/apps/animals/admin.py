"""Admin file for Animals app."""


# Django
from django.contrib import admin

# Local
from .models import Animal
from .models import AnimalImage
from .models import Breed


# Using StackedInline to display Animal Images in Animal
class AnimalImageInline(admin.StackedInline):
    model = AnimalImage
    extra = 0


@admin.register(Breed)
class BreedAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "species"]
    list_filter = ["species"]
    search_fields = [
        "name",
    ]


@admin.register(Animal)
class AnimalAdmin(admin.ModelAdmin):
    inlines = [AnimalImageInline]
    list_display = ["id", "name", "species"]
    list_filter = ["status", "shelter"]
    search_fields = [
        "name",
    ]


@admin.register(AnimalImage)
class AnimalImageAdmin(admin.ModelAdmin):
    list_display = ["id"]
