import { useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WeatherSearch = ({ onWeatherFetch, setLoading }) => {
  const [location, setLocation] = useState("");
  const [saveToHistory, setSaveToHistory] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    try {
      setLoading(true);
      
      if (saveToHistory) {
        const response = await axios.post(`${API}/weather/query`, {
          location_input: location
        });
        onWeatherFetch(response.data.weather_result);
        toast.success("Weather data fetched and saved!");
      } else {
        const response = await axios.get(`${API}/weather/live`, {
          params: { location }
        });
        onWeatherFetch(response.data);
        toast.success("Weather data fetched!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      toast.error(error.response?.data?.detail || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" data-testid="weather-search-form">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city, coordinates, zip code, or landmark..."
            className="input-field pr-12"
            data-testid="search-input"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors"
            data-testid="search-button"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveHistory"
            checked={saveToHistory}
            onChange={(e) => setSaveToHistory(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
            data-testid="save-history-checkbox"
          />
          <label htmlFor="saveHistory" className="text-gray-700">
            Save to history
          </label>
        </div>
      </form>
    </div>
  );
};

export default WeatherSearch;
