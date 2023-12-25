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
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    name = "shelters"
    filterset_fields = ["city"]
    search_fields = ["name", "nip"]
    ordering_fields = ["id"]
    permission_classes = [ShelterBaseAccess]

    def perform_create(self, serializer):
        user = self.request.user

        if user.role == UserRole.SHELTER:
            serializer.save(user=user).clean()


class ShelterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    name = "shelter"
    permission_classes = [ShelterBaseAccess]
