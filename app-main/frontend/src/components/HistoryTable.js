import { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";

const HistoryTable = ({ queries, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [editingQuery, setEditingQuery] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (queries.length === 0) {
    return (
      <div className="card text-center py-12" data-testid="empty-history">
        <p className="text-xl text-gray-500">No weather searches yet. Start by searching on the home page!</p>
      </div>
    );
  }

  return (
    <>
      <div className="card overflow-x-auto" data-testid="history-table">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Location Input</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Resolved Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Temperature</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Weather</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => {
              const temp = query.weather_result?.current?.main?.temp;
              const weather = query.weather_result?.current?.weather?.[0]?.description;
              
              return (
                <tr key={query.id} className="border-b border-gray-100 hover:bg-blue-50 transition-colors" data-testid={`history-row-${query.id}`}>
                  <td className="py-3 px-4">{query.id}</td>
                  <td className="py-3 px-4">{query.location_input}</td>
                  <td className="py-3 px-4 text-sm">{query.resolved_location?.substring(0, 40)}...</td>
                  <td className="py-3 px-4 font-semibold">{temp ? `${Math.round(temp)}°C` : "N/A"}</td>
                  <td className="py-3 px-4 capitalize">{weather || "N/A"}</td>
                  <td className="py-3 px-4 text-sm">{formatDate(query.created_at)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/detail/${query.id}`)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                        title="View Details"
                        data-testid={`view-btn-${query.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingQuery(query)}
                        className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                        title="Edit"
                        data-testid={`edit-btn-${query.id}`}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this query?")) {
                            onDelete(query.id);
                          }
                        }}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                        title="Delete"
                        data-testid={`delete-btn-${query.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingQuery && (
        <UpdateModal
          query={editingQuery}
          onClose={() => setEditingQuery(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default HistoryTable;
