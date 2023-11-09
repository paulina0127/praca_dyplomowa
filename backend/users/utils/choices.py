# Django
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserRole(models.TextChoices):
    """Allowed roles for user."""

    SHELTER = "Schronisko", _("Schronisko")
    ADMIN = "Admin", _("Admin")
