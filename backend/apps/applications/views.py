"""Views for Applications app."""

# Django
from django.core.mail import send_mail

# Third-party
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

# Project
from apps.users.utils.choices import UserRole

# Local
from .models import Application
from .utils.choices import ApplicationStatus
from .utils.permissions import ApplicationBaseAccess
from .utils.serializers import ApplicationSerializer
from .utils.serializers import CreateApplicationSerializer


class ApplicationList(generics.ListCreateAPIView):
    name = "applications"
    filterset_fields = ["status", "animal"]
    search_fields = ["first_name", "last_name"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [ApplicationBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter's applications
        if user.role == UserRole.SHELTER:
            return Application.objects.filter(animal__shelter=user.shelter)
        # Return all applications if the user is admin
        else:
            return Application.objects.all()

    def get_serializer_class(self):
        # Return serializer for creating / updating animals
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return CreateApplicationSerializer
        else:
            return ApplicationSerializer  # Default serializer class

    def perform_create(self, serializer):
        instance = serializer.save()

        # Send email to the applicant
        subject = "Adoptable - Aplikacja o adopcję została złożona"
        message = f"Aplikacja o adopcję zwierzęcia {instance.animal} ze schroniska {instance.animal.shelter} została złożona! Dziękujemy za zainteresowanie naszym zwierzęciem.\n\nW następnym e-mailu otrzymasz informację o odpowiedzi na aplikację.\n\nZespół Adoptable"
        recipient_list = [instance.email]

        send_mail(subject, message, "kontakt@adoptable.pl", recipient_list)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApplicationDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "application"
    permission_classes = [ApplicationBaseAccess]

    def get_queryset(self):
        user = self.request.user

        # Return shelter's applications
        if user.role == UserRole.SHELTER:
            return Application.objects.filter(animal__shelter=user.shelter)
        # Return all applications if the user is admin
        else:
            return Application.objects.all()

    def get_serializer_class(self):
        # Return serializer for creating animals
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return CreateApplicationSerializer
        else:
            return ApplicationSerializer  # Default serializer class

    def perform_update(self, serializer):
        instance = serializer.save()

        # Send email to the applicant
        if instance.status == ApplicationStatus.ACCEPTED:
            subject = "Adoptable - Aplikacja o adopcję została zaakceptowana"
            message = f"Aplikacja o adopcję zwierzęcia {instance.animal} ze schroniska {instance.animal.shelter} została zaakceptowana. Schronisko skontaktuje się z Tobą by ustalić termin odebrania zwierzęcia.\n\nZespół Adoptable"
        elif instance.status == ApplicationStatus.REJECTED:
            subject = "Adoptable - Aplikacja o adopcję została odrzucona"
            message = f"Z przykrością informujemy, że twoja aplikacja o adopcję zwierzęcia {instance.animal} ze schroniska {instance.animal.shelter} została odrzucona.\n\nZespół Adoptable"

        recipient_list = [instance.email]

        send_mail(subject, message, "kontakt@adoptable.pl", recipient_list)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
