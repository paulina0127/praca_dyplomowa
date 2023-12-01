# Third-party
from rest_framework.permissions import BasePermission

# Project
from apps.users.utils.choices import UserRole


class ShelterBaseAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # True if user is admin or owner of shelter
        user = request.user

        if user.role == UserRole.ADMIN:
            return True
        elif user.role == UserRole.SHELTER:
            return obj == user.shelter
        return False
