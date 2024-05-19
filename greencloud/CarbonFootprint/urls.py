from django.urls import path , include
import rest_framework 
from . import views
from .views import UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView
from . import factors1


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),

    path('', views.homepage, name="home"),
    # path('register', views.register, name="register"),
    # path('my-login', views.my_login, name="my-login"),
    path('dashboard', views.dashboard, name="dashboard"),
    # path('user-logout', views.user_logout, name="user-logout"),
    path('calc', views.calc, name='calc'),
    path('rest', views.rest, name='rest'),
    path('calculate_emission', factors1.calculate_emissions, name="calculate_emissions"),
    path('api/data/', views.data, name='data'),
  
  
]