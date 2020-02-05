from rest_framework import serializers

from lister_app.models import List


class ListSerializer(serializers.HyperlinkedModelSerializer):
	parent_list = serializers.HyperlinkedRelatedField(view_name="list-detail", queryset=List.objects.all(), required=False)

	class Meta:
		model = List
		fields = ['url', 'id', 'parent_list', 'title', 'detail', 'tasks', 'is_complete', 'modified_at']
		depth = 10