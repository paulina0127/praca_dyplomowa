"""Model text choices for Users app."""

# Django
from django.db import models


class UserRole(models.TextChoices):
    SHELTER = "Schronisko", "Schronisko"
    ADMIN = "Admin", "Admin"
