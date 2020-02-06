from lister_app.models import List
import django_filters


class ListFilter(django_filters.FilterSet):
	is_root = django_filters.BooleanFilter(field_name="parent_list", lookup_expr="isnull")

	class Meta:
		model = List
		fields = ['parent_list', 'is_root', 'title', 'detail']