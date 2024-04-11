from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required 
from .templates.factors import calculate_emissions
from django.http import JsonResponse
from django.http import HttpResponse

# Create your views here.
@login_required
def home(request):
   return render(request, "home.html", {})


def authView(request):
  if request.method == "POST":
     form = UserCreationForm(request.POST )
     if form.is_valid():
        form.save()
  else:
     form = UserCreationForm()
  return render(request, "registration/signup.html", {"form":form})

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
    return render(request, 'templates/rest.html')