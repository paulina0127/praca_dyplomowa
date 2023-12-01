"""Views for Animals app."""

# Django
from django.core.exceptions import BadRequest

# Third-party
from rest_framework import generics
from rest_framework import serializers
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

# Local
from .models import Animal
from .models import AnimalImage
from .models import Breed
from .utils.filters import AnimalFilter
from .utils.permissions import AnimalBaseAccess
from .utils.serializers import AnimalSerializer
from .utils.serializers import BreedSerializer
from .utils.serializers import CreateAnimalSerializer


class AnimalList(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    name = "animals"
    filterset_class = AnimalFilter
    search_fields = ["name", "breed__name"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [IsAuthenticatedOrReadOnly, AnimalBaseAccess]

    def get_serializer_class(self):
        # Return serializer for creating animals
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return CreateAnimalSerializer
        else:
            return AnimalSerializer  # Default serializer class


class AnimalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    name = "animal"
    permission_classes = [IsAuthenticatedOrReadOnly, AnimalBaseAccess]


class BreedList(generics.ListAPIView):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    name = "breeds"
    filterset_fields = ["species"]
    search_fields = ["name"]
    ordering_fields = ["id"]
