import { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CurrentLocationButton = ({ onWeatherFetch, setLoading }) => {
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationInput = `${latitude},${longitude}`;

        try {
          setLoading(true);
          const response = await axios.get(`${API}/weather/live`, {
            params: { location: locationInput }
          });
          onWeatherFetch(response.data);
          toast.success("Current location weather fetched!");
        } catch (error) {
          console.error("Error fetching weather:", error);
          toast.error("Failed to fetch weather for current location");
        } finally {
          setLoading(false);
          setGettingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get your location. Please check permissions.");
        setGettingLocation(false);
      }
    );
  };

  return (
    <button
      onClick={handleGetCurrentLocation}
      disabled={gettingLocation}
      className="btn-secondary flex items-center gap-2"
      data-testid="current-location-button"
    >
      <MapPin className="w-5 h-5" />
      {gettingLocation ? "Getting location..." : "Use Current Location"}
    </button>
  );
};

export default CurrentLocationButton;
