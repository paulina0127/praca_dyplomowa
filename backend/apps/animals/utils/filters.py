# Third-party
from django_filters import BooleanFilter
from django_filters import CharFilter
from django_filters import FilterSet
from django_filters import ModelMultipleChoiceFilter
from django_filters import MultipleChoiceFilter

# Local
from ..models import Animal
from ..models import Breed
from .choices import AnimalActivities
from .choices import AnimalAge
from .choices import AnimalEnergyLevel
from .choices import AnimalSize
from .choices import AnimalSpecies
from .choices import AnimalTemperament


class AnimalFilter(FilterSet):
    size = MultipleChoiceFilter(
        choices=AnimalSize.choices,
        method="filter_size",
    )
    breed = ModelMultipleChoiceFilter(
        queryset=Breed.objects.all(),
        method="filter_breed",
    )
    age = MultipleChoiceFilter(
        choices=AnimalAge.choices,
        method="filter_age",
    )
    temperament = MultipleChoiceFilter(
        choices=AnimalTemperament.choices,
        method="filter_temperament",
    )
    energy_level = MultipleChoiceFilter(
        choices=AnimalEnergyLevel.choices,
        method="filter_energy_level",
    )
    accepts_animals = MultipleChoiceFilter(
        choices=AnimalSpecies.choices,
        method="filter_accepts_animals",
    )
    medical_needs = BooleanFilter(method="filter_medical_needs")
    activities = MultipleChoiceFilter(
        choices=AnimalActivities.choices,
        method="filter_activities",
    )
    city = CharFilter(method="filter_city")

    class Meta:
        model = Animal
        fields = [
            "status",
            "sex",
            "size",
            "species",
            "breed",
            "age",
            "spayed_neutered",
            "temperament",
            "energy_level",
            "accepts_children",
            "accepts_animals",
            "trained",
            "medical_needs",
            "activities",
            "city",
            "shelter",
        ]

    def filter_size(self, queryset, name, value):
        return queryset.filter(size__in=value)

    def filter_breed(self, queryset, name, value):
        if value:
            return queryset.filter(breed__in=value)
        return queryset

    def filter_age(self, queryset, name, value):
        return queryset.filter(age__in=value)

    def filter_temperament(self, queryset, name, value):
        return queryset.filter(temperament__overlap=value)

    def filter_energy_level(self, queryset, name, value):
        return queryset.filter(energy_level__in=value)

    def filter_accepts_animals(self, queryset, name, value):
        return queryset.filter(accepts_animals__overlap=value)

    def filter_medical_needs(self, queryset, name, value):
        if not value:
            return queryset.filter(medical_needs__len=0)
        return queryset

    def filter_activities(self, queryset, name, value):
        return queryset.filter(activities__overlap=value)

    def filter_city(self, queryset, name, value):
        return queryset.filter(shelter__city=value)
