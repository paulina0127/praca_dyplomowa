"""Views for Profiles app."""

# Django
from django.core.exceptions import BadRequest

# Third-party
from rest_framework import generics
from rest_framework import serializers
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.response import Response

# Local
from .models import Shelter
from .utils.serializers import ShelterSerializer


class ShelterList(generics.ListCreateAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    name = "shelters"
    # filterset_class = AnimalFilter
    search_fields = ["name"]
    ordering_fields = ["id"]
    parser_classes = [MultiPartParser, JSONParser]


class ShelterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    name = "shelter"
    parser_classes = [MultiPartParser, JSONParser]
