# Django
from django.forms import CheckboxSelectMultiple
from django.utils.translation import gettext_lazy as _

# Third-party
from django_filters import DateFilter
from django_filters import FilterSet
from django_filters import MultipleChoiceFilter

# Local
from ..models import Animal
from .choices import AnimalStatus


class AnimalFilter(FilterSet):
    class Meta:
        model = Animal
        fields = ["status"]

    def filter_status(self, queryset, name, value):
        if not value:
            return queryset
        return queryset.filter(status__in=value)
