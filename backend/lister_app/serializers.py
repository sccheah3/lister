from rest_framework import serializers

from lister_app.models import List


class ListSerializer(serializers.HyperlinkedModelSerializer):

	class Meta:
		model = List
		fields = ['url', 'id', 'parent_list', 'title', 'detail', 'tasks', 'is_complete', 'modified_at']
		depth = 10