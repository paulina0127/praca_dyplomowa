"""Admin file for Users app."""

# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

# Local
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password", "role")}),
        (
            ("Uprawnienia"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (("Ważne daty"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "role"),
            },
        ),
    )
    list_display = ("id", "email", "role", "is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name", "role")
    list_filter = (
        "role",
        "is_staff",
        "is_superuser",
        "is_active",
    )
    ordering = ("id",)
