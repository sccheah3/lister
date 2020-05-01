from rest_framework import viewsets
from rest_framework import permissions

from lister_app.serializers import ListSerializer
from lister_app.models import List

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from lister_app.filters import ListFilter

from accounts_app.permissions import IsOwnerOrAdmin


class ListViewSet(viewsets.ModelViewSet):
	serializer_class = ListSerializer
	queryset = List.objects.none()

	filter_backends = [DjangoFilterBackend, filters.SearchFilter]
	filterset_class = ListFilter
	search_fields = ['title']

	permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]


	def get_queryset(self):
		if self.request.user.is_staff:
			return List.objects.all()

		return List.objects.filter(owner=self.request.user.id)

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
