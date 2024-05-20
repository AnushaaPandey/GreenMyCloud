import uuid
from django.shortcuts import render, redirect 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from bs4 import BeautifulSoup
from django.http import JsonResponse
import requests

from CarbonFootprint.factors import CLIMATIQ_API_KEY, calculate_total_and_average_emissions
# from .forms import LoginForm, CreateUserForm
from .factors1 import calculate_emissions, estimate_emission
from .models import EmissionData, Result 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
    return Response({'token':token, 'msg':'Registration Successful'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username = serializer.data.get('username')
    password = serializer.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
    else:
      return Response({'errors':{'non_field_errors':['Username or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)


  
@login_required(login_url="login")
# def user_logout(request):
#         auth.logout(request)
#         return redirect(request, 'my-login.html')
def dashboard(request):
   return JsonResponse(dashboard)

def calculate_emissions(request):
    if request.method == 'POST':
        # Get input data from the POST request
        transportation_mode = request.POST.get('transportation_mode')
        transportation_distance = float(request.POST.get('transportation_distance'))
        waste_weight_kg = float(request.POST.get('waste_weight_kg'))
        electricity_kWh = float(request.POST.get('electricity_kWh'))
        screentime_hours = float(request.POST.get('screentime_hours'))
        dietary_meals = float(request.POST.get('dietary_meals'))
        
        # Calculate emissions and save data into the database
        result = calculate_total_and_average_emissions(
            CLIMATIQ_API_KEY,
            transportation_mode,
            transportation_distance,
            waste_weight_kg,
            electricity_kWh,
            screentime_hours,
            dietary_meals
        )
        
        # Return JSON response with the emissions data
        return JsonResponse(result)



def scrape_articles(request):
    articles = []
    
    # Define the list of newspapers and their URLs
    newspapers = [
        {"name": "cityam", "address": "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/"},
        {"name": "thetimes", "address": "https://www.thetimes.co.uk/environment/climate-change"},
        # Add more newspapers here...
    ]
    
    # Iterate over each newspaper
    for newspaper in newspapers:
        name = newspaper["name"]
        address = newspaper["address"]
        
        # Make an HTTP request to the newspaper's URL
        response = requests.get(address)
        
        # Parse the HTML content using BeautifulSoup
        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, "html.parser")
            
            # Extract article titles and URLs
            for link in soup.find_all("a", string=lambda text: "climate" in str(text).lower()):
                title = link.get_text()
                url = link["href"]
                
                # Append the article to the list of articles
                articles.append({
                    "title": title,
                    "url": url,
                    "source": name
                })
    
    # Return the scraped articles as JSON response
    return JsonResponse(articles, safe=False)













