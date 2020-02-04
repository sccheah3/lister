from rest_framework import viewsets

from lister_app.serializers import ListSerializer
from lister_app.models import List


class ListViewSet(viewsets.ModelViewSet):
	serializer_class = ListSerializer
	queryset = List.objects.all()