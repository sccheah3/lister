from rest_framework import viewsets

from lister_app.serializers import ListSerializer
from lister_app.models import List

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from lister_app.filters import ListFilter


class ListViewSet(viewsets.ModelViewSet):
	serializer_class = ListSerializer
	queryset = List.objects.all()

	filter_backends = [DjangoFilterBackend, filters.SearchFilter]
	filterset_class = ListFilter
	search_fields = ['title', 'detail']