"""Serializers for Applications app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
