from users.views import login, registration, profile, logout
from django.urls import path
from . import views

app_name='users'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('registration/', registration, name='registration'),
    path('profile/', views.profile, name='profile'),
    path('logout/', logout, name='logout'),
    path('check_email/', views.check_email, name='check_email'),

]