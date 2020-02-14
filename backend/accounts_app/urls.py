from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts_app import views


# router = DefaultRouter()
# router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('auth/register/', views.RegistrationAPI.as_view()),
    path('auth/login/', views.LoginAPI.as_view()),
    path('auth/user/', views.UserAPI.as_view()),
    # path('api/', include(router.urls)),
]