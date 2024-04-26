from django.urls import path , include
import rest_framework 

from .views import SettingsView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('settings', SettingsView.as_view()),
  path('api/v1.0/settings/', include ("settingsapp.urls")),
  path('creay-new-setting/', SettingsView.as_view(), name=("new-settings")),
]