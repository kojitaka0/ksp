from django.urls import path
from . import views
from products.views import basket_add, basket_remove

app_name = 'products'

urlpatterns = [
    path('', views.products, name='index'),
    path('<int:product_id>/', views.product_detail, name='detail'),
    path('delete/<int:product_id>/', views.delete_product, name='delete_product'),
    path('update/<int:product_id>/', views.update_product, name='update_product'),
    path('basket/add/<int:product_id>/', basket_add, name='basket_add'),
    path('basket/remove/<int:basket_id>/', basket_remove, name='basket_remove'),
]