import { useState, useEffect } from "react";
import WeatherSearch from "../components/WeatherSearch";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import CurrentLocationButton from "../components/CurrentLocationButton";
import { Cloud } from "lucide-react";

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800" data-testid="app-title">
              Weather App
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get real-time weather information for any location worldwide
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <WeatherSearch onWeatherFetch={setWeatherData} setLoading={setLoading} />
        </div>

        <div className="flex justify-center mb-12">
          <CurrentLocationButton onWeatherFetch={setWeatherData} setLoading={setLoading} />
        </div>

        {loading && (
          <div className="text-center py-12" data-testid="loading-indicator">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Fetching weather data...</p>
          </div>
        )}

        {!loading && weatherData && (
          <div className="space-y-8">
            <WeatherCard data={weatherData} />
            <ForecastList forecast={weatherData?.forecast} />
          </div>
        )}

        {!loading && !weatherData && (
          <div className="text-center py-12" data-testid="empty-state">
            <Cloud className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Search for a location to see weather information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
