"""Views for Profiles app."""

# Third-party
from rest_framework import generics

# Project
from apps.users.utils.choices import UserRole

# Local
from .models import Shelter
from .utils.permissions import ShelterBaseAccess
from .utils.serializers import ShelterSerializer


class ShelterList(generics.ListCreateAPIView):
    serializer_class = ShelterSerializer
    name = "shelters"
    filterset_fields = ["city"]
    search_fields = ["name", "nip"]
    ordering_fields = ["id"]
    permission_classes = [ShelterBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter profiles
        if not user.is_authenticated:
            return Shelter.objects.filter(is_verified=True)
        elif user.role == UserRole.ADMIN:
            return Shelter.objects.all()
        else:
            return Shelter.objects.filter(is_verified=True)

    def perform_create(self, serializer):
        user = self.request.user

        if user.role == UserRole.SHELTER:
            serializer.save(user=user).clean()


class ShelterDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShelterSerializer
    name = "shelter"
    permission_classes = [ShelterBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter's profile
        if not user.is_authenticated:
            return Shelter.objects.filter(is_verified=True)
        elif user.role in [UserRole.ADMIN, UserRole.SHELTER]:
            return Shelter.objects.all()
        else:
            return Shelter.objects.filter(is_verified=True)
