from rest_framework import serializers

from lister_app.models import List


class ListSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = List
        fields = ['url', 'id', 'parent_list', 'title', 'detail', 'tasks', 'is_complete', 'modified_at']
        read_only_fields = ['tasks']


    def is_cyclic_relationship(self, parent_pk, current_pk):

        while parent_pk != None:

            if parent_pk == current_pk:
                return True

            parent = List.objects.get(pk=parent_pk)
            if not parent.parent_list:
                return False

            parent_pk = parent.parent_list.pk

        return False



    def update(self, instance, validated_data):

        parent_list = validated_data.get('parent_list', instance.parent_list)
        if self.is_cyclic_relationship(parent_list.pk, instance.pk):
            return instance

        instance.parent_list = validated_data.get('parent_list', instance.parent_list)
        instance.title = validated_data.get('title', instance.title)
        instance.detail = validated_data.get('detail', instance.detail)
        instance.is_complete = validated_data.get('is_complete', instance.is_complete)
        instance.modified_at = validated_data.get('modified_at', instance.modified_at)

        instance.save()
        return instance


	# serialize nested relations
    def get_fields(self):
        fields = super(ListSerializer, self).get_fields()
        fields['tasks'] = ListSerializer(many=True, required=False, read_only=True)

        return fields