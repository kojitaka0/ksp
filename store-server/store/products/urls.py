from products.views import products
from django.urls import path

app_name='products'
urlpatterns = [
    path('', products, name='index'),

]