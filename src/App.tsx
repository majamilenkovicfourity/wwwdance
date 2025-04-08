import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/app.scss";
import "./index.css";

import AdminApp from "./admin/AdminApp";
import ClientApp from "./Client";
import React from "react";

function App() {
  return (
    <>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <Router basename="/wwwdance">
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/*" element={<ClientApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
