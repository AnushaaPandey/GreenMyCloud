import uuid
from django.shortcuts import render, redirect 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
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

def homepage(request):
    return render(request, 'registration/index.html')

# def register(request):
#     form = CreateUserForm()
#     if request.method == "POST":
#         form = CreateUserForm(request.POST)
#         if form.is_valid():
#             form.save() 
#             return redirect("my-login")
#         else:
#             return HttpResponse("<h1> Registration Error!</h1>")

#     context = {'form': form}
#     return render(request, 'registration/register.html', context=context)

# def my_login(request):
#     form = LoginForm()

#     if request.method == 'POST':
#         form = LoginForm(request, data=request.POST)
#         if form.is_valid():
#             username = request.POST.get('username')
#             password = request.POST.get('password')
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 if user.is_active:
#                     auth.login(request, user)
#                     return redirect("dashboard")
#                 else:
#                     return HttpResponse("<h1> Invalid Login! </h1>")
#             else:
#                 messages.info(request, 'Username or Password is incorrect. ')

#     context = {'form': form}
#     return render(request, 'registration/my-login.html', context=context)



@login_required(login_url="login")
# def user_logout(request):
#         auth.logout(request)
#         return redirect(request, 'my-login.html')
def dashboard(request):
    return render(request, 'registration/dashboard.html')

def calc(request):
    if request.method == 'POST':
        distance = float(request.POST.get('distance', 0))
        electricity = float(request.POST.get('electricity', 0))
        waste = float(request.POST.get('waste', 0))
        meals = int(request.POST.get('meals', 0))
        screentime = int(request.POST.get('screentime',0))

        emissions_data = calculate_emissions( distance, electricity, waste, meals, screentime)

        return render(request, 'rest.html', {'emissions_data': emissions_data})
    else:
        return render(request, 'calc.html')

def rest(request):
    # Your logic for carbon_calculator_results view
    return render(request, 'rest.html')

# def calc(request):
#     if request.method == 'POST':
#         distance = float(request.POST.get('distance', 0))
#         electricity = float(request.POST.get('electricity', 0))
#         waste = float(request.POST.get('waste', 0))
#         meals = int(request.POST.get('meals', 0))
#         screentime = int(request.POST.get('screentime', 0))

#         # Calculate emissions using the calculate_emissions function from factors.py
#         emissions_data = calculate_emissions(distance, electricity, waste, meals, screentime)

#         return render(request, 'rest.html', {'emissions_data': emissions_data})
#     else:
#         return render(request, 'calc.html')



def calculate_user_emissions(request):
    if request.method == 'POST':
        # Assume user data is submitted via a form and saved in the database
        electricity = request.POST.get('electricity')
        waste = request.POST.get('waste')

        # Save user data to the database
        user_data = EmissionData.objects.create(electricity=electricity, waste=waste)
        
        # Calculate emissions using user data
        total_emissions = calculate_emissions(electricity, waste)
        
        return render(request, 'result.html', {'total_emissions': total_emissions})
    else:
        return render(request, 'input_form.html')


def api(APIView):
   CLIMATIQ_API_KEY = "87BKX60S4TMRRGPZZ1342ZZZYTK4"
   weight = 80
   weight_unit = "t"
   emission_estimate = estimate_emission(CLIMATIQ_API_KEY, weight, weight_unit)
   if emission_estimate is not None:
        print("API was Called")
        return JsonResponse(emission_estimate)
   else:
        return JsonResponse({"error": "Failed to estimate emission"}, status=500)
   
   def get(self, request, format=None):
      print("API was Called")
      return Response("CHalyo hai chalyo", status=201)
   


def data(request):
    data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(data)



# # Models Import:
# def user(request):
#     users = User.objects.all()
#     return render(request, 'user.html', {'users': users})

# def userdata(request):
#     usersdata = UserData.objects.all()
#     return render(request, 'user.html', {'usersdata': usersdata})

# def results(request):
#     res = Result.objects.all()
#     return render(request, 'user.html', {'res': res})


# def admin_database(request):
#     admin_databases = AdminDatabase.objects.all()
#     return render(request, 'admin_database.html', {'admin_databases': admin_databases})
















# from django.shortcuts import render, redirect 
# import requests
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.decorators import login_required
# from django.http import JsonResponse
# from django.http import HttpResponse
# from django.contrib.auth.models import auth
# from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.forms import UserCreationForm



# def homepage(request):

#     return render(request, 'registration/index.html')




# def register(request):

#     form = CreateUserForm()

#     if request.method == "POST":

#         form = CreateUserForm(request.POST)

#         if form.is_valid():

#             form.save()

#             return redirect("my-login")


#     context = {'registerform':form}

#     return render(request, 'registration/register.html', context=context)



# def my_login(request):

#     form = LoginForm()

#     if request.method == 'POST':

#         form = LoginForm(request, data=request.POST)

#         if form.is_valid():

#             username = request.POST.get('username')
#             password = request.POST.get('password')

#             user = authenticate(request, username=username, password=password)

#             if user is not None:

#                 auth.login(request, user)

#                 return redirect("dashboard")


#     context = {'loginform':form}

#     return render(request, 'registration/my-login.html', context=context)


# def user_logout(request):

#     auth.logout(request)

#     return redirect("")



# @login_required(login_url="my_login")
# def dashboard(request):

#     return render(request, 'registration/dashboard.html')













