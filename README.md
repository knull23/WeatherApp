# 🌤️ WeatherApp — Full Stack Weather Application

A full-stack weather application built with a **React (Yarn) frontend** and a **Python FastAPI backend**, using live weather API integration.
The app supports user-defined location queries, weather display UI, and a clean separation between client & server.

---

## 🚀 Features

* Search weather by **city, ZIP code, or any location string**
* Live weather API integration
* Display temperature, humidity, wind, conditions, and icons
* Structured frontend + backend project
* Hot reload for both server and client
* Easy to extend with forecast, maps, or CRUD functionality

---

## 📁 Project Structure

```
WeatherApp/
│
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── ... (API routes, weather service, utils)
│
└── frontend/
    ├── package.json
    ├── src/
    └── ... (components, API calls, UI)
```

---

# 🖥️ **Prerequisites**

Make sure you have:

| Tool    | Version                                         |
| ------- | ----------------------------------------------- |
| Node.js | Latest LTS recommended (18 or 20)               |
| Yarn    | Installed via `npm install -g yarn`             |
| Python  | 3.9+                                            |
| Uvicorn | Installed automatically from `requirements.txt` |

---

# ⚙️ Backend Setup (FastAPI)

### 1️⃣ Navigate to backend folder

```bash
cd backend
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**macOS/Linux**

```bash
source venv/bin/activate
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Start FastAPI server

```bash
python -m uvicorn server:app --host 127.0.0.1 --port 8001 --reload
```

The backend will now run at:

👉 **[http://127.0.0.1:8001](http://127.0.0.1:8001)**

---

# 🎨 Frontend Setup (React + Yarn)

### 1️⃣ Navigate to the frontend directory

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
yarn install
```

### 3️⃣ Start React development server

```bash
npx yarn start
```

Frontend will run at:

👉 **[http://localhost:3000](http://localhost:3000)**

---

# 🔗 Connecting Frontend & Backend

The frontend makes API calls to:

```
http://127.0.0.1:8001
```

Make sure both servers are running simultaneously.

---

# 🔧 Environment Variables

Create a `.env` file in **frontend**:

```
REACT_APP_WEATHER_API_KEY=your_key_here
REACT_APP_BACKEND_URL=http://127.0.0.1:8001
```

And in **backend**:

```
WEATHER_API_KEY=your_weather_api_key_here
```

---

# 🧪 Running in Development

Backend (FastAPI):

```bash
uvicorn server:app --reload
```

Frontend (React):

```bash
npx yarn start
```

Both support hot reload.

---

# 📦 Build for Production

### Frontend:

```bash
yarn build
```

### Backend:

Run with production server:

```bash
uvicorn server:app --host 0.0.0.0 --port 8001
```

---

# 🤝 Contributing

Pull requests are welcome.
Follow conventional commits and keep code modular and clean.

---

# 📄 License

This project is licensed under MIT.

---

