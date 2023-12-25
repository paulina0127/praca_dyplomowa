# Third-party
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

# Project
from apps.users.utils.choices import UserRole


class ShelterBaseAccess(BasePermission):
    def has_permission(self, request, view):
        # True for safe methods or if user is admin or shelter
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role in [UserRole.ADMIN, UserRole.SHELTER]
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # True if user is admin or owner of shelter
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role == UserRole.ADMIN
        ):
            return True
        elif user.is_authenticated and user.role == UserRole.SHELTER:
            return obj == user.shelter
        return False
