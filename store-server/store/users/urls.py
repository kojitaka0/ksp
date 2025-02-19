from users.views import login,registration, profile
from django.urls import path

app_name='users'
urlpatterns = [
    path('login/', login, name='login'),
    path('registration/', registration, name='registration'),
    path('profile/', profile, name='profile'),

]