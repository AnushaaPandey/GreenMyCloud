# urls.py
from django.contrib import admin
from django.urls import path, include 
from .views import carbon_calculator
from .views import api
from .views import calculate_emissions
from .views import carbon_calculator_results

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path ('', include("CarbonFootprint.urls")),
#     path('',api, name='api'),
#     path('', carbon_calculator, name='carbon_calculator'),
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api, name='api'),  # Define a unique URL pattern for the api view
    path('', carbon_calculator, name='carbon_calculator'),  # Define a unique URL pattern for the carbon_calculator view
    path('carbon_calculator_results/', carbon_calculator_results, name='carbon_calculator_results'),
    # path('',carbon_calculator_results, name='carbon_calculator_results'),
]




