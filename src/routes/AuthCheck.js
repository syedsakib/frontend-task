import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "../pages/AuthPage";
import DevicesPages from "../pages/DevicesPages";

const AuthCheck = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<AuthPage />} />
        <Route path="/devices" exact element={<DevicesPages />} />
      </Routes>
    </Router>
  );
};

export default AuthCheck;
