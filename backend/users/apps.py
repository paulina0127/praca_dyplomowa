"""Apps file for Users app."""

# Django
from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    """Users app config class."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "users"
    verbose_name = _("Użytkownicy")
