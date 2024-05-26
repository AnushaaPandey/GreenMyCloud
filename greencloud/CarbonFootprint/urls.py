
from django.urls import path 
from .views import UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, SendPasswordResetEmailView, UserPasswordResetView, get_results, verify_payment
from .views import scrape_articles, get_csrf_token, calculate_emissions, logout_user


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('calculate_emission/', calculate_emissions, name="calculate_emissions"),
    path('scrape-articles/', scrape_articles, name='scrape_articles'),
    path('api/csrf/', get_csrf_token, name='get_csrf_token'),
    path('logout/', logout_user, name='logout'),
    path('results/', get_results, name="results"),
    path('verify_payment/', verify_payment, name="verify_payment")
    # path('verify_payment/<str:token>/<str:amount>/', verify_payment, name='verify_payment'),

  
  
]

   # path('', views.homepage, name="home"),
    # path('register', views.register, name="register"),
    # path('my-login', views.my_login, name="my-login"),
    # path('Dashboard', views.dashboard, name="Dashboard"),
    # path('user-logout', views.user_logout, name="user-logout"),
    # path('calc', views.calc, name='calc'),
    # path('rest', views.rest, name='rest'),
        # path('api/data/', views.data, name='data'),

