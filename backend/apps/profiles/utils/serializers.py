"""Serializers for Profiles app."""

# Third-party
from rest_framework import serializers

# Local
from ..models import Shelter
import re

import requests


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        exclude = ["user"]

    def validate_nip(self, value):
        # Check if NIP consists of 10 digits
        if not re.match(r"^[0-9]{10}$", value):
            raise serializers.ValidationError("NIP powinien składać się z 10 cyfr.")

        # Validate the NIP checksum
        digits = [int(i) for i in value]
        weights = (6, 5, 7, 2, 3, 4, 5, 6, 7)
        check_sum = sum(d * w for d, w in zip(digits, weights)) % 11

        if not check_sum == digits[9]:
            raise serializers.ValidationError("NIP jest nieprawidłowy.")

        return value

    def validate_postal_code(self, value):
        if str(value).count("-") != 1:
            raise serializers.ValidationError(
                "Kod pocztowy musi mieć jeden myślnik (-)."
            )
        if not all(char.isdigit() or char == "-" for char in str(value)):
            raise serializers.ValidationError(
                "Kod pocztowy może zawierać tylko cyfry i myślnik."
            )
        return value

    def validate_city(self, value):
        if any(char.isdigit() for char in str(value)):
            raise serializers.ValidationError(
                "Nazwa miejscowości nie może zawierać cyfr."
            )
        return value
