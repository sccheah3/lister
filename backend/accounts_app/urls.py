from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts_app import views


router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]