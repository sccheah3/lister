from rest_framework import viewsets

from lister_app.serializers import ListSerializer
from lister_app.models import List

from django_filters.rest_framework import DjangoFilterBackend


class ListViewSet(viewsets.ModelViewSet):
	serializer_class = ListSerializer
	queryset = List.objects.all()

	# filter_backends = [DjangoFilterBackend]
	filterset_fields = ['parent_list']