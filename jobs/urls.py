from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jobs import views

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'employers', views.EmployersViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'postings', views.PostingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', views.index),
]
