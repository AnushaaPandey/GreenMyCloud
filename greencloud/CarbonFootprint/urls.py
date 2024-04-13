from django.urls import path , include
from .views import authView, home, calc, elec_api, api
import rest_framework 
# from .views import factors
from .views import rest
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path("", home, name="home"),
  path("signup/", authView, name="authView"),
  path("accounts/", include("django.contrib.auth.urls")),
  path('', calc, name='calc'),
  path('', rest, name='rest'),
  path('',elec_api, name='home'),
  path ('api', api )
  # path('api/', api, name='api'),
   # path('admin/', admin.site.urls),
]