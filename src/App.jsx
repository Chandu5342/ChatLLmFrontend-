// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Organizations from "./pages/Organizations";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations"
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route (optional) */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
