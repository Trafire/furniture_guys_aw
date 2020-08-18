from django.urls import path, include
from rest_framework.routers import DefaultRouter
from jobs import views

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'employers', views.EmployersViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'postings', views.PostingViewSet)
router.register(r'applications', views.ApplicationViewSet)
router.register(r'candidates', views.CandidateViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.login_user),
    path('posting/', views.create_posting),
    path('posting/activate/true/<int:id>/', views.activatePosting),
    path('posting/activate/false/<int:id>/', views.deactivatePosting),
    path('stats/', views.stats),
    path('user/create/', views.create_auth),
    path('candidate/create/', views.create_candidate),
    path('applications/create/<int:c>/<int:p>/', views.create_application),

]
