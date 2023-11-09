# Django
from django.contrib.auth import get_user_model

# Third-party
from djoser.serializers import UserCreateSerializer
from djoser.serializers import UserSerializer
from rest_framework import serializers

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


class DefaultUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "role"]


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

        # Return user serializer for shelter
        if user.is_anonymous:
            return
        elif user.role == UserRole.SHELTER:
            serializer = DefaultUserSerializer(instance, context=self.context)
        # Return default user serializer
        else:
            serializer = DefaultUserSerializer(instance, context=self.context)
        return serializer.data
