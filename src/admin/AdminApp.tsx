// src/client/ClientApp.tsx
import { Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import DataUpload from "./Components/DataUpload";

function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/data-upload" element={<DataUpload />} />
      {/* Add more client-only routes here */}
    </Routes>
  );
}

export default AdminApp;
