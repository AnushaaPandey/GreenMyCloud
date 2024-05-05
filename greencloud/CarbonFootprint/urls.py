from django.urls import path , include
import rest_framework 
from . import views
from . import factors


urlpatterns = [

  path('', views.homepage, name="home"),
  path('register', views.register, name="register"),
  path('my-login', views.my_login, name="my-login"),
  path('dashboard', views.dashboard, name="dashboard"),
  path('user-logout', views.user_logout, name="user-logout"),
  path('calc', views.calc, name='calc'),
  path('rest', views.rest, name='rest'),
  path('calculate_emission', factors.calculate_emissions, name="calculate_emissions"),
  path('api/data/', views.data, name='data'),
  
  
]