"""Views for Applications app."""

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
from .models import Application
from .utils.serializers import ApplicationSerializer


class ApplicationList(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    name = "applications"
    # filterset_class = AnimalFilter
    search_fields = ["first_name"]
    ordering_fields = ["id"]
    parser_classes = [MultiPartParser, JSONParser]


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    name = "application"
    parser_classes = [MultiPartParser, JSONParser]
