import { Calendar } from "lucide-react";

const ForecastList = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Get one forecast per day (at 12:00)
  const dailyForecasts = forecast.list.filter((item) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12;
  }).slice(0, 5);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="card" data-testid="forecast-list">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-7 h-7 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">5-Day Forecast</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecasts.map((day, index) => {
          const weather = day.weather?.[0] || {};
          return (
            <div
              key={index}
              className="forecast-card text-center"
              data-testid={`forecast-day-${index}`}
            >
              <div className="font-semibold text-gray-800 mb-2">
                {formatDate(day.dt)}
              </div>
              {weather.icon && (
                <img
                  src={getWeatherIcon(weather.icon)}
                  alt={weather.description}
                  className="w-16 h-16 mx-auto"
                  data-testid={`forecast-icon-${index}`}
                />
              )}
              <div className="text-sm text-gray-600 mb-2 capitalize">
                {weather.description}
              </div>
              <div className="text-2xl font-bold text-gray-800" data-testid={`forecast-temp-${index}`}>
                {Math.round(day.main?.temp || 0)}°C
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {Math.round(day.main?.temp_min || 0)}° / {Math.round(day.main?.temp_max || 0)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList;
