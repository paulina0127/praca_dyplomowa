# Third-party
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission

# Project
from apps.users.utils.choices import UserRole


class ApplicationBaseAccess(BasePermission):
    def has_object_permission(self, request, view, obj):
        # True if user is admin or a shelter associated with the application
        user = request.user

        if user.role == UserRole.ADMIN:
            return True
        elif user.role == UserRole.SHELTER:
            return obj.animal.shelter == user.shelter and request.method in [
                SAFE_METHODS,
                "PATCH",
            ]
        return False
