import { useState, useEffect } from "react";
import axios from "axios";
import HistoryTable from "../components/HistoryTable";
import ExportButtons from "../components/ExportButtons";
import { History, Download } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HistoryPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/weather/query`);
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to fetch weather history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/weather/query/${id}`);
      toast.success("Query deleted successfully");
      fetchQueries();
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Failed to delete query");
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await axios.put(`${API}/weather/query/${id}`, data);
      toast.success("Query updated successfully");
      fetchQueries();
    } catch (error) {
      console.error("Error updating query:", error);
      toast.error("Failed to update query");
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <History className="w-10 h-10 text-blue-500" />
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800" data-testid="history-title">
              Search History
            </h1>
          </div>
          <ExportButtons />
        </div>

        {loading ? (
          <div className="text-center py-12" data-testid="history-loading">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        ) : (
          <HistoryTable
            queries={queries}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
