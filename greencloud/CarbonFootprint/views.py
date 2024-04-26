from django.shortcuts import render, redirect 
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout
from .forms import LoginForm
from .factors import calculate_emissions
from .models import EmissionData 

def homepage(request):
    return render(request, 'registration/index.html')

def register(request):
    form = UserCreationForm()

    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("my-login")

    context = {'registerform': form}
    return render(request, 'registration/register.html', context=context)

def my_login(request):
    form = LoginForm()

    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect("dashboard")

    context = {'loginform': form}
    return render(request, 'registration/my-login.html', context=context)

def user_logout(request):
    auth.logout(request)
    return redirect("")

@login_required(login_url="my_login")
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

def calc(request):
    if request.method == 'POST':
        distance = float(request.POST.get('distance', 0))
        electricity = float(request.POST.get('electricity', 0))
        waste = float(request.POST.get('waste', 0))
        meals = int(request.POST.get('meals', 0))
        screentime = int(request.POST.get('screentime', 0))

        # Calculate emissions using the calculate_emissions function from factors.py
        emissions_data = calculate_emissions(distance, electricity, waste, meals, screentime)

        return render(request, 'rest.html', {'emissions_data': emissions_data})
    else:
        return render(request, 'calc.html')



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













