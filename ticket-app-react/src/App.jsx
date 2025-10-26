import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { LayoutWrapper } from "./components/layoutWrapper";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Tickets from "./pages/Tickets";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* route for footer */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route index path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
