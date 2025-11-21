import requests
from geopy.geocoders import Nominatim
from typing import Dict, Any, Optional, Tuple
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5"

# Validate API key is loaded
if not OPENWEATHER_API_KEY:
    raise ValueError("OPENWEATHER_API_KEY not found in environment variables. Please check your .env file.")

geolocator = Nominatim(user_agent="weather_app")

def resolve_location(location_input: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Resolve location input to coordinates and formatted address.
    Returns (location_data, error_message)
    """
    try:
        # Check if input is coordinates (lat,lon)
        if ',' in location_input:
            try:
                parts = location_input.split(',')
                lat = float(parts[0].strip())
                lon = float(parts[1].strip())
                location = geolocator.reverse(f"{lat}, {lon}", language='en')
                if location:
                    return {
                        'lat': lat,
                        'lon': lon,
                        'display_name': location.address
                    }, None
            except (ValueError, AttributeError):
                pass
        
        # Try geocoding the input
        location = geolocator.geocode(location_input, timeout=10)
        if location:
            return {
                'lat': location.latitude,
                'lon': location.longitude,
                'display_name': location.address
            }, None
        else:
            return None, f"Could not resolve location: {location_input}"
    except Exception as e:
        return None, f"Error resolving location: {str(e)}"

def get_current_weather(lat: float, lon: float) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Fetch current weather data from OpenWeatherMap.
    Returns (weather_data, error_message)
    """
    try:
        url = f"{OPENWEATHER_BASE_URL}/weather"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json(), None
    except requests.exceptions.RequestException as e:
        return None, f"Error fetching weather data: {str(e)}"

def get_forecast(lat: float, lon: float) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Fetch 5-day forecast from OpenWeatherMap.
    Returns (forecast_data, error_message)
    """
    try:
        url = f"{OPENWEATHER_BASE_URL}/forecast"
        params = {
            'lat': lat,
            'lon': lon,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        return response.json(), None
    except requests.exceptions.RequestException as e:
        return None, f"Error fetching forecast data: {str(e)}"

def get_weather_by_location(location_input: str) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """
    Complete weather fetch pipeline: resolve location -> get current weather + forecast.
    Returns (combined_data, error_message)
    """
    # Resolve location
    location_data, error = resolve_location(location_input)
    if error:
        return None, error
    
    lat = location_data['lat']
    lon = location_data['lon']
    
    # Get current weather
    current_weather, error = get_current_weather(lat, lon)
    if error:
        return None, error
    
    # Get forecast
    forecast_data, error = get_forecast(lat, lon)
    if error:
        return None, error
    
    # Combine data
    result = {
        'location': {
            'lat': lat,
            'lon': lon,
            'display_name': location_data['display_name']
        },
        'current': current_weather,
        'forecast': forecast_data
    }
    
    return result, None
