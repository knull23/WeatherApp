import { Link, useLocation } from "react-router-dom";
import { Home, History } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-effect py-4 sticky top-0 z-50 shadow-md">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="nav-logo">
            <span className="text-2xl font-bold text-blue-600">WeatherFlow</span>
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                isActive("/")
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
              data-testid="nav-home"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/history"
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                isActive("/history")
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
              data-testid="nav-history"
            >
              <History className="w-5 h-5" />
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
