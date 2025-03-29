// src/client/ClientApp.tsx
import { Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";

function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      {/* Add more client-only routes here */}
    </Routes>
  );
}

export default AdminApp;
