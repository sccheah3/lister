from django.test import TestCase
from lister_app.models import List


class ListModelTest(TestCase):

	def test_saving_and_retrieving_single_level_list(self):
		list_1 = List.objects.create(title="Go to work.",
									 detail="Need to get to work in San Jose every morning by 9am.")

		list_2 = List.objects.create(title="Go to the gym",
									 detail="Goal is to gain to 175 lbs.")

		saved_lists = List.objects.all()

		self.assertEqual(list_1.title, saved_lists[0].title)
		self.assertEqual(list_1.detail, saved_lists[0].detail)

		self.assertEqual(list_2.title, saved_lists[1].title)
		self.assertEqual(list_2.detail, saved_lists[1].detail)


	def test_multi_level_list(self):
		list_1 = List.objects.create(title="Go to work.",
									 detail="Need to get to work in San Jose every morning by 9am.")

		list_2 = List.objects.create(parent_list=list_1,
									 title="Pack lunch.",
									 detail="Usually leftovers from dinner the night before.")

		task = List.objects.all()[0].tasks.all()[0]

		self.assertEqual(task, list_2)
		self.assertEqual(task.title, list_2.title)
		self.assertEqual(task.detail, list_2.detail)