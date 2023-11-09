"""Models file for Users app."""

# Django
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

# Local
from .utils.choices import UserRole


class CustomUserManager(BaseUserManager):
    """Custom user manager class."""

    def create_user(self, email, password=None, role=None, **extra_fields):
        if not email:
            raise ValueError(_("Użytkownik musi mieć ustawione pole email."))
        email = self.normalize_email(email)

        if role is not None:
            user = self.model(email=email, role=role, **extra_fields)
        else:
            user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, role=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", UserRole.ADMIN)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superużytkownik musi mieć ustawione is_staff na Tak."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(
                _("Superużytkownik musi mieć is_superuser ustawione na Tak.")
            )

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """Custom user model class."""

    username = None
    email = models.EmailField(
        unique=True,
    )
    role = models.CharField(
        choices=UserRole.choices,
        max_length=10,
        verbose_name=_("Rola"),
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = [
            "id",
        ]
        verbose_name = _("Użytkownik")
        verbose_name_plural = _("Użytkownicy")
