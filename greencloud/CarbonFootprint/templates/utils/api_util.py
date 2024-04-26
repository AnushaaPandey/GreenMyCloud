import requests

def estimate_emission(CLIMATIQ_API_KEY, weight, weight_unit):
    url = "https://api.climatiq.io/estimate"
    CLIMATIQ_API_KEY = '87BKX60S4TMRRGPZZ1342ZZZYTK4'
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
        # Check if the request was successful
    if response.status_code == 200:
        # Print the response content
        print(response.json())
    else:
        # Print the error message
        print(f"Error: {response.text}")


    response = requests.post(url, headers=headers, json=data)
    return response.json() if response.status_code == 200 else None

def elec_emission(CLIMATIQ_API_KEY, weight, weight_unit):
    url = "https://api.climatiq.io/data/v1/estimate"
    CLIMATIQ_API_KEY = '87BKX60S4TMRRGPZZ1342ZZZYTK4'
    headers = {
        "Authorization": f"Bearer {CLIMATIQ_API_KEY}"
    }
    data = {
        "emission_factor": {
            "emission_factor": {
            "activity_id": "electricity-supply_grid-source_residual_mix",
            "data_version": "^6"
        },
        "parameters":
            {
            "energy": 4200,
            "energy_unit": "kWh"
            }
            
        }
    }
        # Checking if the request is send successfully
    if response.status_code == 200:
        # Print the response content
        print(response.json())
    else:
        # Print the error message
        print(f"Error: {response.text}")


    response = requests.post(url, headers=headers, json=data)
    return response.json() if response.status_code == 200 else None

