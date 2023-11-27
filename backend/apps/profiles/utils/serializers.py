"""Serializers for Profiles app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Shelter


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        exclude = ["account"]
