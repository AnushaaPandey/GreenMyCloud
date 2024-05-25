import requests
from django.middleware.csrf import get_token
from .models import EmissionData, Result

CLIMATIQ_API_KEY = "87BKX60S4TMRRGPZZ1342ZZZYTK4"
#       "csrfToken": "ta9n4fr0FrIPkV0zgYxd95DtfQrkVbLNdiK55y3GRC8g5IuT0eqXSOFWICLhLVia"

def transportation(CLIMATIQ_API_KEY, mode, distance, request):
    url = "https://api.climatiq.io/estimate"
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}",
        "X-CSRFToken": get_token(request)
    }

    emission_factor_ids = {
        "motorbike": "012059cc-4a5c-4f83-a5e6-8625ec10cfd5",
        "ev_car": "54801be5-00b9-4b9d-a6d7-a48d67484035",
        "car": "31d744e4-d202-4a9f-b0a9-30967a0448ff",
        "diesel_car": "c3f31da2-29f2-48c6-a5ac-9a9f53e7f81f",
        "petrol_car": "40ebe027-a9dd-4513-a286-7eaadb5b16ef",
        "bus": "dd20350e-1a2d-49d9-ae18-f1e9ab78b34d",
        "taxi": "4ed7099b-2101-4d14-a149-201baa97ce15"
    }
    
    if mode not in emission_factor_ids:
        raise ValueError("Invalid transportation mode. Choose from 'motorbike', 'ev_car', 'car', 'diesel_car', 'petrol_car', 'taxi' or 'bus'.")
    
    emission_factor_id = emission_factor_ids[mode]

    data = {
        "emission_factor": {
            "id": emission_factor_id
        },
        "parameters": {
            "distance": distance,
            "distance_unit": "km"
        }
    }
    

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def waste_emission(CLIMATIQ_API_KEY, weight_kg, request):
    url = "https://api.climatiq.io/estimate"
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}",
        "X-CSRFToken": get_token(request)
    }
    
    weight_tonnes = weight_kg / 1000

    data = {
        "emission_factor": {
            "id": "8238f187-ccd7-4dde-bb8f-b68ad74c23e8"
        },
        "parameters": {
            "weight": weight_tonnes,
            "weight_unit": "t"
        }
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def electricity_emission(CLIMATIQ_API_KEY, energy_kWh, request):
    url = "https://api.climatiq.io/estimate"
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}",
        "X-CSRFToken": get_token(request)
    }

    data = {
        "emission_factor": {
            "id": "c43cba1c-1810-460e-93a5-568f656dad80"
        },
        "parameters": {
            "energy": energy_kWh,
            "energy_unit": "kWh"
        }
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def screentime_emission(screentime_hours):
    emission_factor = 0.25
    energy_kWh = screentime_hours * emission_factor
    return energy_kWh

def dietary_emission(meals):
    emission_factor_per_meal = 2.5
    total_emissions = meals * emission_factor_per_meal
    return total_emissions


def calculate_total_and_average_emissions(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, waste_weight_kg, electricity_kWh, screentime_hours, dietary_meals, request):
    transportation_emissions = transportation(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, request)
    waste_emissions = waste_emission(CLIMATIQ_API_KEY, waste_weight_kg, request)
    electricity_emissions = electricity_emission(CLIMATIQ_API_KEY, electricity_kWh, request)
    screentime_emissions = screentime_emission(screentime_hours)
    dietary_emissions = dietary_emission(dietary_meals)

    total_emissions = (
        transportation_emissions['co2e'] * 365 + 
        waste_emissions['co2e'] * 106 + 
        electricity_emissions['co2e']  * 12 + 
        screentime_emissions * 365 + 
        dietary_emissions * 365
    )

    total_count = 5
    average_emissions = total_emissions / total_count

    input_data = EmissionData.objects.create(
        transportation_mode=transportation_mode,
        transportation_distance=transportation_distance,
        waste_weight_kg=waste_weight_kg,
        electricity_kWh=electricity_kWh,
        screentime_hours=screentime_hours,
        dietary_meals=dietary_meals,
        transportation_emissions=transportation_emissions['co2e'],
        waste_emissions=waste_emissions['co2e'],
        electricity_emissions=electricity_emissions['co2e'],
        screentime_emissions=screentime_emissions,
        dietary_emissions=dietary_emissions,
        total_emissions=total_emissions,
        average_emissions=average_emissions
    )

    result = Result.objects.create(
        transportation_emissions=transportation_emissions['co2e'],
        waste_emissions=waste_emissions['co2e'],
        electricity_emissions=electricity_emissions['co2e'],
        screentime_emissions=screentime_emissions,
        dietary_emissions=dietary_emissions,
        total_emissions=total_emissions,
        average_emissions=average_emissions
    )

    return {
        "transportation_emissions": transportation_emissions,
        "waste_emissions": waste_emissions,
        "electricity_emissions": electricity_emissions,
        "screentime_emissions": screentime_emissions,
        "dietary_emissions": dietary_emissions,
        "total_emissions": total_emissions,
        "average_emissions": average_emissions
    }














# def calculate_total_and_average_emissions(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, waste_weight_kg, electricity_kWh, screentime_hours, dietary_meals, request):
#     transportation_emissions = transportation(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, request)
#     waste_emissions = waste_emission(CLIMATIQ_API_KEY, waste_weight_kg, request)
#     electricity_emissions = electricity_emission(CLIMATIQ_API_KEY, electricity_kWh, request)
#     screentime_emissions = screentime_emission(screentime_hours)
#     dietary_emissions = dietary_emission(dietary_meals)
    
#     total_emissions = (
#         transportation_emissions['co2e'] + 
#         waste_emissions['co2e'] + 
#         electricity_emissions['co2e'] + 
#         screentime_emissions + 
#         dietary_emissions
#     )
    
#     total_count = 5
#     average_emissions = total_emissions / total_count
    
#     input_data = EmissionData.objects.create(
#         transportation_mode=transportation_mode,
#         transportation_distance=transportation_distance,
#         waste_weight_kg=waste_weight_kg,
#         electricity_kWh=electricity_kWh,
#         screentime_hours=screentime_hours,
#         dietary_meals=dietary_meals
#     )
    
#     result = Result.objects.create(
#         transportation_emissions=transportation_emissions,
#         waste_emissions=waste_emissions,
#         electricity_emissions=electricity_emissions,
#         screentime_emissions=screentime_emissions,
#         dietary_emissions=dietary_emissions,
#         total_emissions=total_emissions,
#         average_emissions=average_emissions
#     )
    
#     return {
#         "transportation_emissions": transportation_emissions,
#         "waste_emissions": waste_emissions,
#         "electricity_emissions": electricity_emissions,
#         "screentime_emissions": screentime_emissions,
#         "dietary_emissions": dietary_emissions,
#         "total_emissions": total_emissions,
#         "average_emissions": average_emissions
#     }









# # Functions for emissions calculation
# from .models import EmissionData, Result
# import requests
# CLIMATIQ_API_KEY = "87BKX60S4TMRRGPZZ1342ZZZYTK4"
# def transportation(CLIMATIQ_API_KEY, mode, distance):
#     url = "https://api.climatiq.io/estimate"
#     headers = {
#         "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
#     }

#     emission_factor_ids = {
#         "motorbike": "012059cc-4a5c-4f83-a5e6-8625ec10cfd5",
#         "ev_car": "54801be5-00b9-4b9d-a6d7-a48d67484035",
#         "car": "31d744e4-d202-4a9f-b0a9-30967a0448ff",
#         "diesel_car": "c3f31da2-29f2-48c6-a5ac-9a9f53e7f81f",
#         "petrol_car": "40ebe027-a9dd-4513-a286-7eaadb5b16ef",
#         "bus": "dd20350e-1a2d-49d9-ae18-f1e9ab78b34d",
#         "walk": " 0.14"
#     }
#     chosen_mode = emission_factor_ids  # Example mode chosen by the user
#     mode = emission_factor_ids.get(chosen_mode)
#     if mode not in emission_factor_ids:
#         raise ValueError("Invalid transportation mode. Choose from 'motorbike', 'ev_car', 'car', 'diesel_car', 'petrol_car', 'walk' or 'bus'.")

#     data = {
#         "emission_factor": {
#             "id": emission_factor_ids[mode]
#         },
#         "parameters": {
#             "distance": distance,
#             "distance_unit": "km"
#         }
#     }

#     response = requests.post(url, headers=headers, json=data)
#     return response.json() if response.status_code == 200 else None


# def waste_emission(CLIMATIQ_API_KEY, weight_kg):
#     url = "https://api.climatiq.io/estimate"
#     headers = {
#         "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
#     }
    
#     # Convert weight from kilograms to tonnes
#     weight_tonnes = weight_kg / 1000

#     data = {
#         "emission_factor": {
#             "id": "8238f187-ccd7-4dde-bb8f-b68ad74c23e8"
#         },
#         "parameters": {
#             "weight": weight_tonnes,
#             "weight_unit": "t"
#         }
#     }

#     response = requests.post(url, headers=headers, json=data)
#     return response.json() if response.status_code == 200 else None


# def electricity_emission(CLIMATIQ_API_KEY, energy_kWh):
#     url = "https://api.climatiq.io/estimate"
#     headers = {
#         "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
#     }

#     data = {
#         "emission_factor": {
#             "id": "c43cba1c-1810-460e-93a5-568f656dad80"
#         },
#         "parameters": {
#             "energy": energy_kWh,
#             "energy_unit": "kWh"
#         }
#     }

#     response = requests.post(url, headers=headers, json=data)
#     return response.json() if response.status_code == 200 else None




# def screentime_emission(screentime_hours):
#     # Emission factor for screen time (kgCO2e/kWh)
#     emission_factor = 0.25
    
#     # Calculate energy consumption in kWh
#     energy_kWh = screentime_hours * emission_factor
    
#     return energy_kWh


# def dietary_emission(meals):
#     # Emission factor for dietary consumption (kgCO2 per meal)
#     emission_factor_per_meal = 2.5
    
#     # Calculate total emissions
#     total_emissions = meals * emission_factor_per_meal
    
#     return total_emissions


# # Main function to calculate total emissions and average

# def calculate_total_and_average_emissions(CLIMATIQ_API_KEY, transportation_mode, transportation_distance, waste_weight_kg, electricity_kWh, screentime_hours, dietary_meals):
#     # Calculate emissions for transportation
#     transportation_emissions = transportation(CLIMATIQ_API_KEY, transportation_mode, transportation_distance)
    
#     # Calculate emissions for waste
#     waste_emissions = waste_emission(CLIMATIQ_API_KEY, waste_weight_kg)
    
#     # Calculate emissions for electricity
#     electricity_emissions = electricity_emission(CLIMATIQ_API_KEY, electricity_kWh)
    
#     # Calculate emissions for screentime
#     screentime_emissions = screentime_emission(screentime_hours)
    
#     # Calculate emissions for dietary consumption
#     dietary_emissions = dietary_emission(dietary_meals)
    
#     # Calculate total emissions
#     total_emissions = (
#         transportation_emissions + 
#         waste_emissions + 
#         electricity_emissions + 
#         screentime_emissions + 
#         dietary_emissions
#     )
    
#     # Calculate average emissions
#     total_count = 5  # Number of emissions sources
#     average_emissions = total_emissions / total_count
    
#     input_data = EmissionData.objects.create(
#         transportation_mode=transportation_mode,
#         transportation_distance=transportation_distance,
#         waste_weight_kg=waste_weight_kg,
#         electricity_kWh=electricity_kWh,
#         screentime_hours=screentime_hours,
#         dietary_meals=dietary_meals
#     )
    
#     # Save emissions results into the database
#     result = Result.objects.create(
#         transportation_emissions=transportation_emissions,
#         waste_emissions=waste_emissions,
#         electricity_emissions=electricity_emissions,
#         screentime_emissions=screentime_emissions,
#         dietary_emissions=dietary_emissions,
#         total_emissions=total_emissions,
#         average_emissions=average_emissions
#     )
    
#     # Return all emissions and the average
#     return {
#         "transportation_emissions": transportation_emissions,
#         "waste_emissions": waste_emissions,
#         "electricity_emissions": electricity_emissions,
#         "screentime_emissions": screentime_emissions,
#         "dietary_emissions": dietary_emissions,
#         "total_emissions": total_emissions,
#         "average_emissions": average_emissions
#     }


