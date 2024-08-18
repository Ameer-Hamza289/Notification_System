import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Content from "./components/Content";
import Notifications from "./components/Notifications";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import './index.css'

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  return (
    <Router>
      {token && <Navbar token={token} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        {token && (
          <>
            <Route path="/content" element={<Content token={token} />} />
            <Route
              path="/notifications"
              element={<Notifications token={token} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
