# Third-party
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

# Project
from apps.users.utils.choices import UserRole


class AnimalBaseAccess(BasePermission):
    def has_permission(self, request, view):
        user = request.user

        if (
            user.role == UserRole.ADMIN
            or user.role == UserRole.SHELTER
            or request.method in SAFE_METHODS
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # True if user is admin or a shelter associated with the animal
        user = request.user

        if user.role == UserRole.ADMIN or request.method in SAFE_METHODS:
            return True
        elif user.role == UserRole.SHELTER:
            return obj.shelter == user.shelter
        return False
