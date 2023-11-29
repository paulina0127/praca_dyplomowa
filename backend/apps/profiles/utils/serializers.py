"""Serializers for Profiles app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Shelter


class CreateShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = "__all__"


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        exclude = ["account"]
