import { Cloud, Droplets, Wind, Gauge, Sunrise, Sunset, MapPin } from "lucide-react";

const WeatherCard = ({ data }) => {
  if (!data || !data.current) return null;

  const { current, location } = data;
  const weather = current.weather?.[0] || {};
  const main = current.main || {};
  const wind = current.wind || {};
  const sys = current.sys || {};

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="card" data-testid="weather-card">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800" data-testid="location-name">
            {current.name || location?.display_name || "Unknown Location"}
          </h2>
        </div>
        <p className="text-gray-600" data-testid="weather-description">
          {weather.description || "No description"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
        {weather.icon && (
          <img
            src={getWeatherIcon(weather.icon)}
            alt={weather.description}
            className="weather-icon"
            data-testid="weather-icon"
          />
        )}
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-800" data-testid="temperature">
            {Math.round(main.temp || 0)}°C
          </div>
          <div className="text-gray-600 mt-2">
            Feels like {Math.round(main.feels_like || 0)}°C
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stat-item" data-testid="humidity-stat">
          <Droplets className="w-6 h-6 text-blue-500" />
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="text-xl font-semibold text-gray-800">{main.humidity || 0}%</div>
        </div>

        <div className="stat-item" data-testid="wind-stat">
          <Wind className="w-6 h-6 text-blue-500" />
          <div className="text-sm text-gray-600">Wind Speed</div>
          <div className="text-xl font-semibold text-gray-800">{wind.speed || 0} m/s</div>
        </div>

        <div className="stat-item" data-testid="pressure-stat">
          <Gauge className="w-6 h-6 text-blue-500" />
          <div className="text-sm text-gray-600">Pressure</div>
          <div className="text-xl font-semibold text-gray-800">{main.pressure || 0} hPa</div>
        </div>

        <div className="stat-item" data-testid="sunrise-stat">
          <Sunrise className="w-6 h-6 text-orange-500" />
          <div className="text-sm text-gray-600">Sunrise</div>
          <div className="text-lg font-semibold text-gray-800">{formatTime(sys.sunrise)}</div>
        </div>

        <div className="stat-item" data-testid="sunset-stat">
          <Sunset className="w-6 h-6 text-orange-500" />
          <div className="text-sm text-gray-600">Sunset</div>
          <div className="text-lg font-semibold text-gray-800">{formatTime(sys.sunset)}</div>
        </div>

        <div className="stat-item" data-testid="clouds-stat">
          <Cloud className="w-6 h-6 text-gray-500" />
          <div className="text-sm text-gray-600">Cloudiness</div>
          <div className="text-xl font-semibold text-gray-800">{current.clouds?.all || 0}%</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
