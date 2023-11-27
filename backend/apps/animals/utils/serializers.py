"""Serializers for Animals app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Animal
from ..models import AnimalImage
from ..models import Breed


class AnimalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimalImage
        fields = ["name", "image"]


class BreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Breed
        fields = ["name"]


class AnimalSerializer(serializers.ModelSerializer):
    breed = BreedSerializer()
    images = AnimalImageSerializer(many=True)

    class Meta:
        model = Animal
        fields = "__all__"


class CreateAnimalSerializer(serializers.ModelSerializer):
    images = AnimalImageSerializer(many=True, required=False)

    class Meta:
        model = Animal
        fields = "__all__"
