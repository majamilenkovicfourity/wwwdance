import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/app.scss";
import "./index.css";

import AdminApp from "./admin/AdminApp";
import ClientApp from "./Client";

function App() {
  return (
    <Router basename="/wwwdance">
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<ClientApp />} />
      </Routes>
    </Router>
  );
}

export default App;
