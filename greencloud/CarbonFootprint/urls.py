# from django.contrib import admin
from django.urls import path , include
from .views import authView, home
from .views import calc
# from .views import api
# from .views import factors
from .views import rest

urlpatterns = [
  path("", home, name="home"),
  path("signup/", authView, name="authView"),
  path("accounts/", include("django.contrib.auth.urls")),
  path('', calc, name='calc'),
  path('', rest, name='rest'),
  # path('api/', api, name='api'),
   # path('admin/', admin.site.urls),
]