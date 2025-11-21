# Weather App Backend

FastAPI-based backend for the Weather Application with SQLite database and OpenWeatherMap API integration.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database (async with aiosqlite)
- **Geopy** - Location geocoding and fuzzy matching
- **OpenWeatherMap API** - Real-time weather data
- **ReportLab** - PDF export generation
- **LXML** - XML export generation

## Important Note for Windows Users

**The backend runs on a Linux server** in a Kubernetes cluster managed by Emergent platform. You don't need to install Python or run the server locally on Windows. The server is already running and accessible at your preview URL.

You can:
- ✅ Use the API through your browser or Windows apps
- ✅ Test endpoints using PowerShell, Command Prompt, or tools like Postman
- ✅ Access the frontend which automatically connects to the backend
- ❌ You don't need to run `pip install` or start the server yourself

## Prerequisites (If Running Locally on Windows)

- Python 3.11+ (from python.org)
- pip (included with Python)
- PowerShell or Command Prompt

## Installation (Local Windows Setup - Optional)

1. **Open PowerShell or Command Prompt**

2. **Navigate to backend directory:**
```powershell
cd C:\path\to\your\project\backend
```

3. **Create virtual environment (recommended):**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

4. **Install dependencies:**
```powershell
pip install -r requirements.txt
```

## Configuration

### On Emergent Platform (Current Setup)

The `.env` file is located at `/app/backend/.env` on the Linux server:
```bash
OPENWEATHER_API_KEY="your_api_key_here"
CORS_ORIGINS="*"
DB_NAME="test_database"
MONGO_URL="mongodb://localhost:27017"  # Not used but kept for compatibility
```

### Get OpenWeatherMap API Key:
1. Sign up at: https://openweathermap.org/api
2. Get free API key (Current Weather Data plan)
3. **Important:** Keys can take up to 2 hours to activate after signup
4. Update the key in `/app/backend/.env` file

### For Local Windows Setup (Optional)

Create a `.env` file in your backend directory:
```powershell
# Create .env file using PowerShell
Set-Content -Path ".env" -Value @"
OPENWEATHER_API_KEY=your_api_key_here
CORS_ORIGINS=*
DB_NAME=test_database
"@
```

Or create it using Notepad:
1. Open Notepad
2. Add the environment variables
3. Save as `.env` (make sure "Save as type" is "All Files")

## Running the Server

### On Emergent Platform (Current - Already Running)

Your backend is **already running** at: `https://openweather-update.preview.emergentagent.com/api/`

The server runs automatically and restarts when you make code changes. No manual commands needed!

To check server status or restart (through Emergent terminal):
```bash
# These commands run on the Linux server, not your Windows PC
sudo supervisorctl status backend
sudo supervisorctl restart backend
```

### Local Windows Setup (Optional)

If you want to run locally on Windows:

**Using PowerShell:**
```powershell
# Navigate to backend folder
cd backend

# Activate virtual environment (if created)
.\venv\Scripts\activate

# Run the server
python -m uvicorn server:app --host 127.0.0.1 --port 8001 --reload
```

**Using Command Prompt:**
```cmd
cd backend
venv\Scripts\activate
python -m uvicorn server:app --host 127.0.0.1 --port 8001 --reload
```

Server will be available at: `http://localhost:8001`

## Database

- **Type:** SQLite
- **Location:** `/app/backend/weather_app.db`
- **Auto-initialization:** Database and tables are created automatically on first run

### Database Schema

**weather_queries table:**
```sql
CREATE TABLE weather_queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_input VARCHAR NOT NULL,
    resolved_location VARCHAR NOT NULL,
    start_date DATE,
    end_date DATE,
    weather_result JSON NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

**Base URL (Production):** `https://openweather-update.preview.emergentagent.com/api`
**Base URL (Local):** `http://localhost:8001/api`

### Testing APIs from Windows

**Option 1: Using PowerShell (Built-in)**
```powershell
# PowerShell uses Invoke-RestMethod or Invoke-WebRequest
$response = Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/" -Method Get
$response
```

**Option 2: Using curl (Windows 10+)**
```cmd
curl https://openweather-update.preview.emergentagent.com/api/
```

**Option 3: Using Postman or Thunder Client (Recommended)**
- Download Postman: https://www.postman.com/downloads/
- Or use Thunder Client extension in VS Code

**Option 4: Using Browser**
- Simply open the URL in Chrome/Edge/Firefox for GET requests

---

### Weather Routes (`/api/weather`)

#### 1. Create Weather Query (with DB save)
```
POST /api/weather/query
Content-Type: application/json

Body:
{
  "location_input": "London",
  "start_date": "2024-01-01",
  "end_date": "2024-01-07"
}
```

**Windows PowerShell Example:**
```powershell
$body = @{
    location_input = "New York"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/query" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

**Windows curl Example:**
```cmd
curl -X POST "https://openweather-update.preview.emergentagent.com/api/weather/query" ^
  -H "Content-Type: application/json" ^
  -d "{\"location_input\": \"New York\"}"
```

#### 2. Get All Weather Queries
```
GET /api/weather/query
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/query"
```

**Browser:** Just open `https://openweather-update.preview.emergentagent.com/api/weather/query`

#### 3. Get Single Weather Query
```
GET /api/weather/query/{id}
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/query/1"
```

#### 4. Update Weather Query
```
PUT /api/weather/query/{id}
Content-Type: application/json

Body:
{
  "location_input": "Paris"
}
```

**Windows PowerShell:**
```powershell
$body = @{
    location_input = "Paris"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/query/1" `
  -Method Put `
  -ContentType "application/json" `
  -Body $body
```

#### 5. Delete Weather Query
```
DELETE /api/weather/query/{id}
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/query/1" `
  -Method Delete
```

#### 6. Get Live Weather (no DB save)
```
GET /api/weather/live?location={location}
```

**Windows PowerShell:**
```powershell
# City name
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/live?location=Tokyo"

# Coordinates
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/live?location=51.5074,-0.1278"

# Zip code
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/live?location=10001"
```

**Browser:** Open `https://openweather-update.preview.emergentagent.com/api/weather/live?location=London`

#### 7. Get 5-Day Forecast
```
GET /api/weather/forecast?location={location}
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/weather/forecast?location=Berlin"
```

### Export Routes (`/api/export`)

#### Download Exports from Windows

**PowerShell Examples:**

```powershell
# Export as JSON
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/json" `
  -OutFile "weather_queries.json"

# Export as CSV
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/csv" `
  -OutFile "weather_queries.csv"

# Export as XML
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/xml" `
  -OutFile "weather_queries.xml"

# Export as PDF
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/pdf" `
  -OutFile "weather_queries.pdf"
```

**Browser Method (Easiest):**
- Simply click the export buttons in the web app, or
- Open the URL directly in your browser to download

### Health Check
```
GET /api/
GET /api/health
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/"
```

## Location Input Formats

The backend supports multiple location input formats:

1. **City name:** `"London"`, `"New York"`, `"Tokyo"`
2. **City, Country:** `"Paris, France"`, `"Sydney, Australia"`
3. **Coordinates:** `"51.5074,-0.1278"`, `"40.7128,-74.0060"`
4. **Zip/Postal code:** `"10001"`, `"SW1A 1AA"`
5. **Landmarks:** `"Eiffel Tower"`, `"Big Ben"`

Location resolution uses Geopy's Nominatim geocoder for fuzzy matching.

## Project Structure

```
/app/backend/
├── server.py              # Main FastAPI application
├── database.py            # SQLAlchemy database setup
├── models.py              # Database and Pydantic models
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── weather_app.db         # SQLite database (auto-generated)
├── routes/
│   ├── weather_routes.py  # Weather CRUD endpoints
│   └── export_routes.py   # Export endpoints (JSON/CSV/XML/PDF)
└── services/
    └── weather_service.py # OpenWeatherMap API integration
```

## Troubleshooting

### 1. API Key errors (401 Unauthorized)

**Problem:** Getting "Invalid API key" error

**Solution:**
1. Make sure you signed up at https://openweathermap.org/api
2. Check your email for activation
3. **Wait 1-2 hours** - New API keys take time to activate
4. Verify key is correct in `.env` file

**Test your API key from Windows PowerShell:**
```powershell
$apiKey = "YOUR_API_KEY_HERE"
Invoke-RestMethod -Uri "https://api.openweathermap.org/data/2.5/weather?q=London&appid=$apiKey&units=metric"
```

If you get weather data, the key works! If not, wait longer or generate a new key.

### 2. Can't connect to API from Windows

**Problem:** Unable to reach the backend API

**Solutions:**
- ✅ Check your internet connection
- ✅ Make sure you're using the correct URL: `https://openweather-update.preview.emergentagent.com`
- ✅ Try opening the URL in your browser first
- ✅ Check if Windows Firewall is blocking the connection

**Test connection from Windows:**
```powershell
Test-NetConnection -ComputerName weatherflow-5.preview.emergentagent.com -Port 443
```

### 3. CORS errors in browser

**Problem:** Browser shows CORS policy error

**Solution:** The backend is configured with `CORS_ORIGINS="*"` which allows all origins. If you still see errors:
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito/private mode
- Try a different browser

### 4. Export downloads not working

**Problem:** Export buttons don't download files

**Try these from Windows PowerShell:**
```powershell
# Create a downloads folder
New-Item -ItemType Directory -Force -Path ".\downloads"

# Download exports
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/json" `
  -OutFile ".\downloads\weather.json"
```

### 5. Server not running (On Emergent Platform)

The server is managed automatically, but if you need to check or restart:

**Note:** These commands are run in the Emergent terminal (Linux), not your Windows PowerShell:
```bash
# Check status
sudo supervisorctl status backend

# Restart if needed
sudo supervisorctl restart backend

# View logs
tail -n 50 /var/log/supervisor/backend.err.log
```

## Testing from Windows

### Quick Test Script (PowerShell)

Save this as `test-weather-api.ps1`:

```powershell
# Weather API Test Script for Windows
$baseUrl = "https://openweather-update.preview.emergentagent.com/api"

Write-Host "Testing Weather API..." -ForegroundColor Green

# Test 1: Health check
Write-Host "`n1. Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/"
    Write-Host "✅ Server is running: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Server not responding" -ForegroundColor Red
    exit
}

# Test 2: Get live weather
Write-Host "`n2. Testing live weather for London..." -ForegroundColor Yellow
try {
    $weather = Invoke-RestMethod -Uri "$baseUrl/weather/live?location=London"
    $temp = $weather.current.main.temp
    $desc = $weather.current.weather[0].description
    Write-Host "✅ Weather: $temp°C, $desc" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to fetch weather: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Create weather query
Write-Host "`n3. Creating weather query..." -ForegroundColor Yellow
try {
    $body = @{
        location_input = "Paris"
    } | ConvertTo-Json
    
    $query = Invoke-RestMethod -Uri "$baseUrl/weather/query" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body
    
    $queryId = $query.id
    Write-Host "✅ Query created with ID: $queryId" -ForegroundColor Green
    
    # Test 4: Get all queries
    Write-Host "`n4. Fetching all queries..." -ForegroundColor Yellow
    $allQueries = Invoke-RestMethod -Uri "$baseUrl/weather/query"
    Write-Host "✅ Found $($allQueries.Count) queries" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTest complete!" -ForegroundColor Green
```

**Run the test:**
```powershell
# Navigate to where you saved the file
cd C:\your\folder

# Run the test
.\test-weather-api.ps1
```

### Manual Testing from Windows

**Using Browser (Easiest):**
1. Open your browser
2. Go to: `https://openweather-update.preview.emergentagent.com`
3. Search for any city
4. Check History page
5. Try export buttons

**Using Postman:**
1. Download Postman for Windows
2. Import this collection:
   - Create new request
   - URL: `https://openweather-update.preview.emergentagent.com/api/weather/live?location=London`
   - Method: GET
   - Click Send

**Using Windows Terminal (curl):**
```cmd
curl "https://openweather-update.preview.emergentagent.com/api/weather/live?location=Tokyo"
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| OPENWEATHER_API_KEY | OpenWeatherMap API key | - | Yes |
| CORS_ORIGINS | Allowed CORS origins (comma-separated) | * | No |
| DB_NAME | Database name (legacy, not used) | test_database | No |
| MONGO_URL | MongoDB URL (legacy, not used) | - | No |

## Development Notes

- Hot reload is enabled in production via supervisor watchfiles
- Only restart server when:
  - Installing new dependencies
  - Modifying .env file
  - Making configuration changes
- Database tables are auto-created on startup
- All datetime values stored as ISO strings in SQLite
- JSON weather data is stored as-is from OpenWeatherMap

## API Response Examples

### Successful Weather Query Response
```json
{
  "id": 1,
  "location_input": "London",
  "resolved_location": "London, Greater London, England, United Kingdom",
  "start_date": null,
  "end_date": null,
  "weather_result": {
    "location": {
      "lat": 51.5074456,
      "lon": -0.1277653,
      "display_name": "London, Greater London, England, United Kingdom"
    },
    "current": {
      "coord": {"lon": -0.1278, "lat": 51.5074},
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "main": {
        "temp": 12.5,
        "feels_like": 11.8,
        "temp_min": 11.2,
        "temp_max": 13.9,
        "pressure": 1015,
        "humidity": 72
      },
      "wind": {
        "speed": 3.6,
        "deg": 250
      },
      "sys": {
        "sunrise": 1700556789,
        "sunset": 1700589123
      }
    },
    "forecast": {
      "list": [...]
    }
  },
  "created_at": "2024-11-19T18:45:00.123456"
}
```

### Error Response
```json
{
  "detail": "Could not resolve location: InvalidCity123"
}
```

## Production Deployment

The backend runs on `0.0.0.0:8001` and is managed by supervisor:
- Auto-restart on crashes
- Log rotation
- Process monitoring
- Hot reload on code changes

Access via: `https://your-domain.com/api/`

## Support

For issues or questions:
- Check logs: `/var/log/supervisor/backend.*.log`
- Verify API key is valid and activated
- Ensure all dependencies are installed
- Check database file permissions
