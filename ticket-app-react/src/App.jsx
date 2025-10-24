import { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { LayoutWrapper } from "./components/layoutWrapper";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Routes>
        {/* route for footer */}
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route index path="login" element={<Login />} />
            <Route index path="signup" element={<SignUp />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
