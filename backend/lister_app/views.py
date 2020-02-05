from rest_framework import viewsets

from lister_app.serializers import ListSerializer
from lister_app.models import List

from django_filters.rest_framework import DjangoFilterBackend
import django_filters


class ListFilter(django_filters.FilterSet):
	is_root = django_filters.BooleanFilter(field_name="parent_list", lookup_expr="isnull")

	class Meta:
		model = List
		fields = ['parent_list', 'is_root', 'title', 'detail']

class ListViewSet(viewsets.ModelViewSet):
	serializer_class = ListSerializer
	queryset = List.objects.all()

	# filter_backends = [DjangoFilterBackend]
	#filterset_fields = ['parent_list', 'title']
	filterset_class = ListFilter