"""Admin file for Applications app."""


# Django
from django.contrib import admin

# Local
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["id", "animal", "added_at"]
