import { Download, FileJson, FileText, FileCode, FileType } from "lucide-react";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExportButtons = () => {
  const handleExport = async (format) => {
    try {
      const response = await fetch(`${API}/export/${format}`);
      
      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `weather_queries.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Exported as ${format.toUpperCase()}`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <div className="flex gap-2" data-testid="export-buttons">
      <button
        onClick={() => handleExport("json")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-colors"
        title="Export as JSON"
        data-testid="export-json-btn"
      >
        <FileJson className="w-4 h-4" />
        JSON
      </button>
      <button
        onClick={() => handleExport("csv")}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
        title="Export as CSV"
        data-testid="export-csv-btn"
      >
        <FileText className="w-4 h-4" />
        CSV
      </button>
      <button
        onClick={() => handleExport("xml")}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors"
        title="Export as XML"
        data-testid="export-xml-btn"
      >
        <FileCode className="w-4 h-4" />
        XML
      </button>
      <button
        onClick={() => handleExport("pdf")}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-colors"
        title="Export as PDF"
        data-testid="export-pdf-btn"
      >
        <FileType className="w-4 h-4" />
        PDF
      </button>
    </div>
  );
};

export default ExportButtons;
