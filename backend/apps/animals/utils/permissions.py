# Third-party
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

# Project
from apps.users.utils.choices import UserRole


class AnimalBaseAccess(BasePermission):
    def has_permission(self, request, view):
        # True for safe methods or if user is admin or shelter
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role in [UserRole.ADMIN, UserRole.SHELTER]
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # True for safe methods or if user is admin or shelter associated with the animal
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role == UserRole.ADMIN
        ):
            return True
        elif user.is_authenticated and user.role == UserRole.SHELTER:
            return obj.shelter == user.shelter
        return False


class BreedBaseAccess(BasePermission):
    def has_permission(self, request, view):
        # True for safe methods or if user is admin or shelter
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role == UserRole.ADMIN
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # True for safe methods or if user is admin or shelter associated with the animal
        user = request.user

        if request.method in SAFE_METHODS or (
            user.is_authenticated and user.role == UserRole.ADMIN
        ):
            return True
        return False
