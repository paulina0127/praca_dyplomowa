"""Serializers for Animals app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Animal
from ..models import AnimalImage
from ..models import Breed
from apps.profiles.models import Shelter


class AnimalShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = [
            "id",
            "name",
            "street_address",
            "city",
            "postal_code",
            "image",
        ]


class AnimalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalImage
        fields = ["name", "image"]


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ["name"]


class AnimalSerializer(serializers.ModelSerializer):
    shelter = AnimalShelterSerializer(read_only=True)
    breed = BreedSerializer(read_only=True)
    images = AnimalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Animal
        fields = "__all__"


class CreateAnimalSerializer(serializers.ModelSerializer):
    images = AnimalImageSerializer(many=True, required=False)

    class Meta:
        model = Animal
        fields = "__all__"

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])

        animal = Animal.objects.create(**validated_data)

        for image_data in images_data:
            AnimalImage.objects.create(animal=animal, **image_data)

        return animal
