"""Serializers for Applications app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Application
from apps.animals.models import Animal, AnimalImage
from ..utils.choices import ApplicationStatus


class ApplicationAnimalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalImage
        fields = ["image"]


class ApplicationAnimalSerializer(serializers.ModelSerializer):
    images = ApplicationAnimalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Animal
        fields = ["id", "name", "images"]


class ApplicationSerializer(serializers.ModelSerializer):
    animal = ApplicationAnimalSerializer(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"


class CreateApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"

    def validate(self, data):
        if "email" and "animal" in data:
            existing_applications = Application.objects.filter(
                email=data["email"],
                status=ApplicationStatus.SUBMTTED,
                animal=data["animal"],
            )

            if self.instance:
                existing_applications = existing_applications.exclude(
                    pk=self.instance.pk
                )

            if existing_applications.exists():
                raise serializers.ValidationError(
                    {
                        "detail": [
                            "Aplikacja o adopcję tego zwierzęcia już została złożona"
                        ]
                    }
                )

        return data
