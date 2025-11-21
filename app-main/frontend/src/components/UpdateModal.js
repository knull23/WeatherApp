import { useState } from "react";
import { X } from "lucide-react";

const UpdateModal = ({ query, onClose, onUpdate }) => {
  const [location, setLocation] = useState(query.location_input);
  const [startDate, setStartDate] = useState(query.start_date || "");
  const [endDate, setEndDate] = useState(query.end_date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(query.id, {
      location_input: location,
      start_date: startDate || null,
      end_date: endDate || null
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="update-modal">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Update Weather Query</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            data-testid="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
              required
              data-testid="update-location-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Date (Optional)
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
              data-testid="update-start-date"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Date (Optional)
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
              data-testid="update-end-date"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn-primary flex-1"
              data-testid="update-submit-btn"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
              data-testid="update-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
