"""Apps file for Animals app."""

# Django
from django.apps import AppConfig


class AnimalsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.animals"
    verbose_name = "Zwierzęta"
