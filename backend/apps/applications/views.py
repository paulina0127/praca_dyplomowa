"""Views for Applications app."""

# Third-party
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

# Project
from apps.users.utils.choices import UserRole

# Local
from .models import Application
from .utils.permissions import ApplicationBaseAccess
from .utils.serializers import ApplicationSerializer


class ApplicationList(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    name = "applications"
    filterset_fields = ["status", "animal"]
    search_fields = ["first_name", "last_name"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [IsAuthenticated, ApplicationBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter's applications
        if user.role == UserRole.SHELTER:
            return Application.objects.filter(animal__shelter=user.shelter)
        # Return all applications if the user is admin
        else:
            return Application.objects.all()


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ApplicationSerializer
    name = "application"
    permission_classes = [IsAuthenticated, ApplicationBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter's applications
        if user.role == UserRole.SHELTER:
            return Application.objects.filter(animal__shelter=user.shelter)
        # Return all applications if the user is admin
        else:
            return Application.objects.all()
