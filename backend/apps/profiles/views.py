"""Views for Profiles app."""

# Third-party
from rest_framework import generics

# Local
from .models import Shelter
from .utils.permissions import ShelterBaseAccess
from .utils.serializers import CreateShelterSerializer
from .utils.serializers import ShelterSerializer


class ShelterList(generics.ListCreateAPIView):
    queryset = Shelter.objects.all()
    name = "shelters"
    filterset_fields = ["city"]
    search_fields = ["name", "nip"]
    ordering_fields = ["id"]
    permission_classes = [ShelterBaseAccess]

    def get_serializer_class(self):
        # Return serializer for creating / updating shelters
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return CreateShelterSerializer
        else:
            return ShelterSerializer  # Default serializer class


class ShelterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    name = "shelter"
    permission_classes = [ShelterBaseAccess]
