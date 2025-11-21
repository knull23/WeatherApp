# Weather App Frontend

React-based frontend for the Weather Application with modern UI, real-time weather display, and full CRUD functionality.

## Important Note for Windows Users

**The frontend is already running and deployed!** You don't need to install Node.js or run the development server locally on Windows. The app is live at:

🌐 **https://openweather-update.preview.emergentagent.com**

You can:
- ✅ Access the app directly from any Windows browser (Chrome, Edge, Firefox)
- ✅ Use it like any website - no installation needed
- ✅ Test all features without running anything locally
- ❌ You don't need to run `npm install` or `yarn install` unless you want to develop locally

## Quick Access from Windows

### Method 1: Using Browser (Easiest)

1. Open any browser (Chrome, Edge, Firefox)
2. Go to: **https://openweather-update.preview.emergentagent.com**
3. Start using the app immediately!

### Method 2: Create Desktop Shortcut

**Windows 10/11:**
1. Open the app URL in your browser
2. Click menu (⋮) → "More tools" → "Create shortcut"
3. Check "Open as window" for app-like experience
4. Now you have a desktop icon!

### Method 3: Pin as App (Edge)

1. Open app in Microsoft Edge
2. Click ⋮ → "Apps" → "Install this site as an app"
3. Right-click app → "Pin to taskbar"

## Features

### 1. Home Page
- Search weather by city, coordinates, zip code, or landmark
- Display current temperature, humidity, wind, pressure
- Show sunrise/sunset times
- 5-day weather forecast with icons
- "Use Current Location" button (GPS)
- Option to save searches to history

### 2. History Page
- View all saved weather searches
- Edit queries (update location/dates)
- Delete queries with confirmation
- Export data as JSON, CSV, XML, or PDF
- Click to view detailed forecast

### 3. Detail Page
- Full weather information for saved query
- Complete 5-day forecast
- Back navigation to history

## Testing from Windows

### Browser Testing (No Installation)

**Open the app:**
```
https://openweather-update.preview.emergentagent.com
```

**Test these features:**
1. **Search weather:**
   - Try "London", "New York", "Tokyo"
   - Try coordinates: "40.7128,-74.0060"
   - Try zip code: "10001"

2. **Current location:**
   - Click "Use Current Location" button
   - Allow location permission when prompted

3. **Save to history:**
   - Check "Save to history" checkbox
   - Search for weather
   - Go to History page to see saved query

4. **Edit/Delete:**
   - In History, click pencil icon to edit
   - Click trash icon to delete

5. **Export data:**
   - Click JSON, CSV, XML, or PDF buttons
   - Files download to your Downloads folder

### Using Browser DevTools (F12)

**Check for errors:**
1. Press `F12` to open DevTools
2. Go to "Console" tab
3. Look for any red error messages

**Monitor API calls:**
1. Open DevTools (`F12`)
2. Go to "Network" tab
3. Search for weather
4. See API requests and responses

**Test responsive design:**
1. Press `Ctrl + Shift + M` (device mode)
2. Test different screen sizes
3. Try mobile and tablet views

## Local Development (Optional)

If you want to run the app locally on your Windows machine:

### Prerequisites
- Node.js 18+ from https://nodejs.org/
- PowerShell or Command Prompt

### Setup

**Using PowerShell:**
```powershell
# Navigate to frontend folder
cd C:\path\to\weather-app\frontend

# Install dependencies (first time only)
yarn install

# Start development server
yarn start
```

**Using Command Prompt:**
```cmd
cd C:\path\to\weather-app\frontend
yarn install
yarn start
```

The app opens at: `http://localhost:3000`

### Available Commands

```powershell
# Start development server
yarn start

# Build for production
yarn build

# Run tests
yarn test
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── HomePage.js       # Weather search & display
│   │   ├── HistoryPage.js    # Saved queries
│   │   └── DetailPage.js     # Detailed view
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── WeatherSearch.js
│   │   ├── WeatherCard.js
│   │   ├── ForecastList.js
│   │   ├── HistoryTable.js
│   │   ├── UpdateModal.js
│   │   └── ExportButtons.js
│   └── components/ui/        # Shadcn components
├── public/
├── package.json
└── .env                      # Environment variables
```

## Troubleshooting (Windows)

### App not loading

**Solutions:**
- Hard refresh: `Ctrl + Shift + R`
- Clear cache: `Ctrl + Shift + Delete`
- Try incognito mode: `Ctrl + Shift + N`
- Try different browser

### Location permission not working

1. Windows Settings (`Windows + I`)
2. Privacy & Security → Location
3. Enable location for your browser

### Downloads not working

**Check Downloads folder:**
```powershell
# Open Downloads folder
explorer.exe "$env:USERPROFILE\Downloads"
```

**Manual download using PowerShell:**
```powershell
Invoke-WebRequest -Uri "https://openweather-update.preview.emergentagent.com/api/export/json" `
  -OutFile "$env:USERPROFILE\Downloads\weather.json"
```

### Check if backend is running

**Using PowerShell:**
```powershell
# Test connection
Invoke-RestMethod -Uri "https://openweather-update.preview.emergentagent.com/api/"

# Should return: {"message": "Weather App API"}
```

### Port 3000 already in use (Local dev)

```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

## Keyboard Shortcuts (Windows)

### App Shortcuts
- `Enter` in search → Search weather
- `F5` → Refresh page
- `Ctrl + Shift + R` → Hard refresh

### Browser Shortcuts
- `F12` → Open DevTools
- `Ctrl + T` → New tab
- `Ctrl + L` → Focus address bar
- `Ctrl + +/-` → Zoom in/out
- `F11` → Fullscreen

## Tech Stack

- **React 19** - UI library
- **React Router** - Page navigation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **Shadcn/UI** - UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Environment Variables

Located in `.env` file:
```
REACT_APP_BACKEND_URL=https://openweather-update.preview.emergentagent.com
```

For local development, create `.env.local`:
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Testing Checklist

✅ Open app in browser
✅ Search weather by city name
✅ Search by coordinates
✅ Use current location button
✅ Check 5-day forecast displays
✅ Save query to history
✅ View history page
✅ Edit a saved query
✅ Delete a saved query
✅ View detail page
✅ Export as JSON
✅ Export as CSV
✅ Export as XML
✅ Export as PDF
✅ Test on mobile view (DevTools)
✅ Check navigation works

## Common Windows Commands

### Check Node.js version
```powershell
node --version
npm --version
yarn --version
```

### Open project in VS Code
```powershell
cd C:\path\to\frontend
code .
```

### View real-time logs (if running locally)
The development server shows logs in the terminal automatically.

## Performance Tips

- Use Chrome or Edge for best performance
- Close unused browser tabs
- Clear cache regularly
- Keep browser updated
- Disable unnecessary extensions

## Summary for Windows Users

**You can use the app immediately:**
1. Open browser
2. Go to https://openweather-update.preview.emergentagent.com
3. No installation required!

**For developers:**
- Install Node.js
- Run `yarn install` and `yarn start`
- Edit files in VS Code
- Changes auto-reload

**Everything works on Windows 10/11 with any modern browser!**

## Support

- Press `F12` in browser to see errors
- Check backend: https://openweather-update.preview.emergentagent.com/api/
- Clear cache if issues persist
- Try incognito mode for testing
