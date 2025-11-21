import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/weather/query/${id}`);
        setQuery(response.data);
      } catch (error) {
        console.error("Error fetching query:", error);
        toast.error("Failed to fetch weather details");
      } finally {
        setLoading(false);
      }
    };

    fetchQuery();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center py-12" data-testid="detail-loading">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Weather query not found</p>
            <button
              onClick={() => navigate("/history")}
              className="btn-primary mt-4"
              data-testid="back-to-history-btn"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-semibold"
          data-testid="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to History
        </button>

        <div className="space-y-8">
          <WeatherCard data={query.weather_result} />
          <ForecastList forecast={query.weather_result?.forecast} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
