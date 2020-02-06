from rest_framework import serializers

from lister_app.models import List


class ListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = List
        fields = ['url', 'id', 'parent_list', 'title', 'detail', 'tasks', 'is_complete', 'modified_at']


    def get_fields(self):
        fields = super(ListSerializer, self).get_fields()
        fields['tasks'] = ListSerializer(many=True, required=False)

        return fields