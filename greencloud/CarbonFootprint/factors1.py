
import requests

def estimate_emission(CLIMATIQ_API_KEY, weight, weight_unit):
    url = "https://api.climatiq.io/estimate"
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
    }
    data = {
        "emission_factor": {
            "activity_id": "waste-type_organic_food_and_drink-disposal_method_anaerobic_digestion",
            "source": "BEIS",
            "region": "GB",
            "year": 2023,
            "source_lca_activity": "end_of_life",
            "data_version": "11.11"
        },
        "parameters": {
            "weight": weight,
            "weight_unit": weight_unit
        }
    }
   

    response = requests.post(url, headers=headers, json=data)
    return response.json() if response.status_code == 200 else None
pass

def elec_emission(CLIMATIQ_API_KEY, energy, energy_unit):
    url = "https://api.climatiq.io/data/v1/estimate"
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
    }
    data = {
        "emission_factor": {
            "activity_id": "electricity-supply_grid-source_residual_mix",
            "data_version": "^6"
        },
        "parameters": {
            "energy": energy,
            "energy_unit": energy_unit
        }
    }

    response = requests.post(url, headers=headers, json=data)
    return response.json() if response.status_code == 200 else None
pass

def calculate_emissions(distance, electricity, waste, meals, screentime):
    CLIMATIQ_API_KEY = '87BKX60S4TMRRGPZZ1342ZZZYTK4'

    # Call API to estimate emissions
    waste_emissions = estimate_emission(CLIMATIQ_API_KEY, waste, "kg")
    electricity_emissions = elec_emission(CLIMATIQ_API_KEY, electricity, "kWh")

    # Add more API calls or modify as needed

    # Calculate total emissions if required
    total_emissions = waste_emissions + electricity_emissions
    print (total_emissions)

    return total_emissions

