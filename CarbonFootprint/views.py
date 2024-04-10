from django.shortcuts import render
# import requests
from .templates.emission_calculator import calculate_emissions
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
# from .templates.emission_calculator import calculate_emissions
# from django.template.loader import get_template

def carbon_calculator(request):
    if request.method == 'POST':
        distance = float(request.POST.get('distance', 0))
        electricity = float(request.POST.get('electricity', 0))
        waste = float(request.POST.get('waste', 0))
        meals = int(request.POST.get('meals', 0))
        screentime = int(request.POST.get('screentime',0))

        emissions_data = calculate_emissions( distance, electricity, waste, meals, screentime)

        return render(request, 'carbon_calculator_results.html', {'emissions_data': emissions_data})
    else:
        return render(request, 'carbon_calculator.html')

# def carbon_calculator(request):
#     if request.method == 'POST':
#         country = request.POST.get('country')
#         distance = float(request.POST.get('distance', 0))
#         electricity = float(request.POST.get('electricity', 0))
#         waste = float(request.POST.get('waste', 0))
#         meals = int(request.POST.get('meals', 0))
#         screentime = float(request.POST.get('screentime', 0))

#         # Check if country is None
#         if country is None:
#             # Handle the case where country is None
#             # You can render an error message or redirect to another page
#             return render(request, 'error.html', {'message': 'Country is required'})

#         emissions_data = calculate_emissions(country, distance, electricity, waste, meals, screentime)

#         return render(request, 'templates/carbon_calculator_results.html', {'emissions_data': emissions_data})
#     else:
#         return render(request, 'templates/carbon_calculator.html')

# def carbon_calculator(request):
#     if request.method == 'POST':
#         country = request.POST.get('country')
#         distance = float(request.POST.get('distance', 0))
#         electricity = float(request.POST.get('electricity', 0))
#         waste = float(request.POST.get('waste', 0))
#         meals = int(request.POST.get('meals', 0))
#         screentime = float(request.POST.get('screentime', 0))

#         # Check if country is None
#         if country is None:
#             # Handle the case where country is None
#             # You can render an error message or redirect to another page
#             return render(request, 'error.html', {'message': 'Country is required'})

#         emissions_data = calculate_emissions(country, distance, electricity, waste, meals, screentime)

#         # Render the template with the emissions data
#         return render(request, 'carbon_calculator_results.html', {'emissions_data': emissions_data})
#     else:
#         # Render the carbon calculator form template
#         return render(request, 'carbon_calculator.html')

def api(request):
    response = requests.get('https://api.climatiq.io').json
    return render(request, 'api.html', {'response': response})

def carbon_calculator_results(request):
    # Your logic for carbon_calculator_results view
    return render(request, 'templates/carbon_calculator_results.html')



# # views.py
# from django.shortcuts import render
# import requests
# from django.http import JsonResponse
# from django.http import HttpResponse
# from .templates.emission_calculator import calculate_emissions
# from django.template.loader import get_template
# # from .models import YourModel

# from django.conf import settings
# import pprint

# def carbon_calculator(request):
#     pprint.pprint(settings.TEMPLATES[0]['DIRS'])
#     # Rest of your view function code...

# # from .emission_calculator import calculate_emissions


# def carbon_calculator(request):
#     template = get_template('carbon_calculator.html')
#     return HttpResponse(template.render())
#     if request.method == 'POST':
#         country = request.POST.get('country')
#         distance = float(request.POST.get('distance', 0))
#         electricity = float(request.POST.get('electricity', 0))
#         waste = float(request.POST.get('waste', 0))
#         meals = int(request.POST.get('meals', 0))

#         emissions_data = calculate_emissions(country, distance, electricity, waste, meals)

#         return render(request, 'templates/carbon_calculator_results.html', {'emissions_data': emissions_data})
#     else:
#         return render(request, 'templates/carbon_calculator.html')

# def api(request):
#     response = requests.get('https://api.climatiq.io').json
#     return HttpResponse(response.render())
#     #  # Process API response and save it to MySQL database
#     # for item in response:
#     #     your_model_instance = YourModel(field1=item['field1'], field2=item['field2'])
#     #     your_model_instance.save()
#     return render(request, 'templates/api.html', {'response': response})

# # def carbon_calculator_results(request):
# #     template = get_template('carbon_calculator_results.html')
# #     return render(request, 'templates/carbon_calculator_results.html')
    

# # def carbon_calculator(request):
# #     if request.method == 'POST':
# #         country = request.POST.get('country')
# #         distance = float(request.POST.get('distance', 0))
# #         electricity = float(request.POST.get('electricity', 0))
# #         waste = float(request.POST.get('waste', 0))
# #         meals = int(request.POST.get('meals', 0))

# #         emissions_data = calculate_emissions(country, distance, electricity, waste, meals)

# #         return render(request, 'Templates/carbon_calculator_results.html', {'emissions_data': emissions_data})
# #     else:
# #         return render(request, 'Templates/carbon_calculator.html')

# # def api(request):
# #     response = requests.get('https://api.climatiq.io').json
# #     return render(request,'Templates/carbon_calculator.html', {'response':response})
