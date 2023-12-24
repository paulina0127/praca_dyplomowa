"""Views for Animals app."""

# Third-party
from rest_framework import generics, status
from rest_framework.response import Response

# Local
from .models import Animal, AnimalImage
from .models import Breed
from .utils.filters import AnimalFilter
from .utils.permissions import AnimalBaseAccess, BreedBaseAccess
from .utils.serializers import AnimalSerializer
from .utils.serializers import BreedSerializer
from .utils.serializers import CreateAnimalSerializer
from apps.users.utils.choices import UserRole
from django.core.files.uploadedfile import InMemoryUploadedFile


class AnimalList(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    name = "animals"
    filterset_class = AnimalFilter
    search_fields = ["name", "breed__name"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [AnimalBaseAccess]

    def get_serializer_class(self):
        # Return serializer for creating animals
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return CreateAnimalSerializer
        else:
            return AnimalSerializer  # Default serializer class

    def perform_create(self, serializer):
        user = self.request.user

        if user.role == UserRole.SHELTER:
            serializer.save(shelter=user.shelter).clean()

    def post(self, request, *args, **kwargs):
        temperament_values = []
        accepts_animals_values = []
        activities_values = []
        medical_needs_values = []
        images_data = []

        for key, value in request.data.items():
            if key.startswith("temperament[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(temperament_values) <= index:
                    temperament_values.append(None)
                temperament_values[index] = value
            elif key.startswith("accepts_animals[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(accepts_animals_values) <= index:
                    accepts_animals_values.append(None)
                accepts_animals_values[index] = value
            elif key.startswith("activities[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(activities_values) <= index:
                    activities_values.append(None)
                activities_values[index] = value
            elif key.startswith("medical_needs[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(medical_needs_values) <= index:
                    medical_needs_values.append(None)
                medical_needs_values[index] = value
            elif key.startswith("images[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(images_data) <= index:
                    images_data.append({})
                images_data[index] = value

        data = {}
        for key, value in request.data.items():
            if (
                not (key.startswith("temperament[") and key.endswith("]"))
                and not (key.startswith("accepts_animals[") and key.endswith("]"))
                and not (key.startswith("activities[") and key.endswith("]"))
                and not (key.startswith("medical_needs[") and key.endswith("]"))
                and not (key.startswith("images[") and key.endswith("]"))
            ):
                data[key] = value

        data["temperament"] = temperament_values
        data["accepts_animals"] = accepts_animals_values
        data["activities"] = activities_values
        data["medical_needs"] = medical_needs_values

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        animal = serializer.save()

        # Create AnimalImage objects
        for image_data in images_data:
            AnimalImage.objects.create(animal=animal, image=image_data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AnimalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    name = "animal"
    permission_classes = [AnimalBaseAccess]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        # Existing values
        existing_temperament_values = set(instance.temperament)
        existing_accepts_animals_values = set(instance.accepts_animals)
        existing_activities_values = set(instance.activities)
        existing_medical_needs_values = set(instance.medical_needs)

        # Existing images
        existing_images_data = [
            {"id": image.id, "image": image.image.url}
            for image in instance.images.all()
        ]

        # New values from the request
        new_temperament_values = set()
        new_accepts_animals_values = set()
        new_activities_values = set()
        new_medical_needs_values = set()

        # New images
        new_images_data = []

        for key, value in request.data.items():
            if key.startswith("temperament[") and key.endswith("]"):
                new_temperament_values.add(value)
            elif key.startswith("accepts_animals[") and key.endswith("]"):
                new_accepts_animals_values.add(value)
            elif key.startswith("activities[") and key.endswith("]"):
                new_activities_values.add(value)
            elif key.startswith("medical_needs[") and key.endswith("]"):
                new_medical_needs_values.add(value)
            elif key.startswith("images[") and key.endswith("]"):
                index = int(key.split("[")[1].split("]")[0])
                while len(new_images_data) <= index:
                    new_images_data.append({})
                new_images_data[index] = value

        # Combine existing and new values
        combined_temperament_values = list(
            existing_temperament_values.union(new_temperament_values)
        )
        combined_accepts_animals_values = list(
            existing_accepts_animals_values.union(new_accepts_animals_values)
        )
        combined_activities_values = list(
            existing_activities_values.union(new_activities_values)
        )
        combined_medical_needs_values = list(
            existing_medical_needs_values.union(new_medical_needs_values)
        )

        # Identify deleted images
        deleted_image_ids = set(
            existing_image["id"] for existing_image in existing_images_data
        ) ^ set(
            int(new_image)
            for new_image in new_images_data
            if not isinstance(new_image, InMemoryUploadedFile)
        )

        data = {}
        for key, value in request.data.items():
            if (
                not (key.startswith("temperament[") and key.endswith("]"))
                and not (key.startswith("accepts_animals[") and key.endswith("]"))
                and not (key.startswith("activities[") and key.endswith("]"))
                and not (key.startswith("medical_needs[") and key.endswith("]"))
                and not (key.startswith("images[") and key.endswith("]"))
            ):
                data[key] = value

        data["temperament"] = combined_temperament_values
        data["accepts_animals"] = combined_accepts_animals_values
        data["activities"] = combined_activities_values
        data["medical_needs"] = combined_medical_needs_values

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Create new AnimalImage objects for each new image
        for image_data in new_images_data:
            if isinstance(image_data, InMemoryUploadedFile):
                AnimalImage.objects.create(animal=instance, image=image_data)

        # Delete images that were removed
        for deleted_image_id in deleted_image_ids:
            AnimalImage.objects.filter(id=deleted_image_id).delete()

        return Response(serializer.data)


class BreedList(generics.ListAPIView):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    name = "breeds"
    filterset_fields = ["species"]
    search_fields = ["name"]
    ordering_fields = ["id"]
    permission_classes = [BreedBaseAccess]


class BreedDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Breed.objects.all()
    serializer_class = BreedSerializer
    name = "breed"
    permission_classes = [BreedBaseAccess]
