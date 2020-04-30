from django.db import models

from lister_project import settings


class List(models.Model):
	parent_list = models.ForeignKey('self', related_name='tasks', null=True, on_delete=models.CASCADE)
	owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='lists', null=True, on_delete=models.CASCADE)
	title = models.CharField(max_length=256)
	is_complete = models.BooleanField(default=False)

	modified_at = models.DateTimeField(auto_now=True)
	created_at = models.DateTimeField(auto_now_add=True)


	def __str__(self):
		return self.title