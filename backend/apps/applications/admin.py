"""Admin file for Applications app."""


# Django
from django.contrib import admin

# Local
from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ["id", "animal", "first_name", "last_name", "added_at"]
    list_filter = ["status", "animal"]
    search_fields = [
        "first_name",
        "last_name",
    ]
