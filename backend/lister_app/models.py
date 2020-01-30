from django.db import models


class List(models.Model):
	parent_list = models.ForeignKey('self', related_name='tasks', null=True, on_delete=models.CASCADE)
	title = models.CharField(max_length=256)
	detail = models.TextField()
	is_complete = models.BooleanField(default=False)

	modified_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)