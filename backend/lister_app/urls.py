from django.urls import path, include
from rest_framework.routers import DefaultRouter

from lister_app import views

# create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'lists', views.ListViewSet)

urlpatterns = [
	path('api/', include(router.urls)),
]