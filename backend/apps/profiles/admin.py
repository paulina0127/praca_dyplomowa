"""Admin file for Profiles app."""

# Django
from django.contrib import admin

# Local
from .models import Shelter


@admin.register(Shelter)
class ShelterAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "nip"]
    search_fields = ["name", "nip", "city"]
