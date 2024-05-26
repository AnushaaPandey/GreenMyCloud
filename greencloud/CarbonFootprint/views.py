from django.contrib.auth.models import AnonymousUser 
import json
import uuid
from django.shortcuts import render, redirect 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
from .factors import calculate_total_and_average_emissions, CLIMATIQ_API_KEY
from .models import EmissionData, Result 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer, UserProfileSerializer, UserRegistrationSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from .models import Result
from django.utils import timezone


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

def dashboard(request):
   return JsonResponse(dashboard)

@csrf_exempt  # Temporarily exempt from CSRF for testing; remove in production
def calculate_emissions(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            transportation_mode = data['transportation_mode']
            transportation_distance = float(data['transportation_distance'])
            waste_weight_kg = float(data['waste_weight_kg'])
            electricity_kWh = float(data['electricity_kWh'])
            screentime_hours = float(data['screentime_hours'])
            dietary_meals = float(data['dietary_meals'])

            result = calculate_total_and_average_emissions(
                CLIMATIQ_API_KEY,
                transportation_mode,
                transportation_distance,
                waste_weight_kg,
                electricity_kWh,
                screentime_hours,
                dietary_meals,
                request
            )
            return JsonResponse(result)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


def get_results(request):
    if request.method == 'GET':
        try:
            # Retrieve the latest Result object from the database
            latest_result = Result.objects.latest('id')
            data = {
                'transportation_emissions': latest_result.transportation_emissions,
                'waste_emissions': latest_result.waste_emissions,
                'electricity_emissions': latest_result.electricity_emissions,
                'screentime_emissions': latest_result.screentime_emissions,
                'dietary_emissions': latest_result.dietary_emissions,
                'total_emissions': latest_result.total_emissions,
                'average_emissions': latest_result.average_emissions,
            }
            return JsonResponse(data)
        except Result.DoesNotExist:
            return JsonResponse({'error': 'No results found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


def scrape_articles(request):
    articles = []
    
    # Define the list of newspapers and their URLs
    newspapers = [
        {"name": "cityam", "address": "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/"},
        {"name": "thetimes", "address": "https://www.thetimes.co.uk/environment/climate-change"},
        {"name": "bbc","address": "https://www.bbc.com/news/topics/cmj34zmwm1zt",},
        {"name": "national_geographic","address": "https://www.nationalgeographic.com/environment/",}
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

@csrf_exempt
def verify_payment(request):
    url = "https://khalti.com/api/v2/payment/verify/"
    token = request.POST.get('token')
    amount = int(float(request.POST.get('amount')) *100)
    # amount = 10
    print("token",token)
    payload ={
        "token":token,
        "amount":amount
    }
    headers ={
        "Authorization": "key test_secret_key_ea5cd15137fc40b18b02b35ab9675315",
        # 'Content-Type': 'application/json',
    }
    response = requests.post(url,payload,headers=headers)
    print(response.text)
    if response.status_code == 200:
        return JsonResponse({'success':True, 'message': 'Aee Bhayoooo!!'})
    else:
         return JsonResponse({'success':False, 'message': 'Aee NBayenaaaaa!!'})
        
@api_view(['POST'])
def logout_user(request):
    if not isinstance(request.user, AnonymousUser):  # Check if user is authenticated
        # Update last_login field in the database
        request.user.last_login = timezone.now()
        request.user.save()
        
        # Logout the user
        logout(request)
        
        return Response({'message': 'Logout successful'})
    else:
        return Response({'message': 'User is not authenticated'})
  

def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrfToken': token})














