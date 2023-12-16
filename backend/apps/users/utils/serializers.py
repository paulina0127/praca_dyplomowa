"""Serializers for Users app."""

# Django
from django.contrib.auth import get_user_model

# Third-party
from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from rest_framework import serializers

# Project
from apps.profiles.models import Shelter

# Local
from .choices import UserRole

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            "id",
            "email",
            "password",
            "role",
        ]

    def validate_role(self, value):
        # Sprawdź, czy rola to "admin" i jeśli tak, podnieś błąd PermissionDenied
        if value == UserRole.ADMIN:
            raise serializers.ValidationError(
                "Nie masz uprawnień by ustawić rolę 'Admin'"
            )
        return value


class DefaultUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "role"]


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = ["id", "name", "image"]


class ShelterUserSerializer(UserSerializer):
    profile = ShelterSerializer(read_only=True, source="shelter")

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "role", "profile"]


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "role"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        user = self.context["request"].user

        if user.is_anonymous:
            return
        elif user.role != UserRole.ADMIN:
            self.fields["role"].read_only = True

    def to_representation(self, instance):
        user = self.context["request"].user

        if user.is_anonymous:
            return
        # Return user serializer for shelter
        elif user.role == UserRole.SHELTER:
            serializer = ShelterUserSerializer(instance, context=self.context)
        # Return default user serializer
        else:
            serializer = DefaultUserSerializer(instance, context=self.context)
        return serializer.data
