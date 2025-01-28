import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/app.scss";

import HomePage from "./components/HomePage";

import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <Router basename="/wwwdance">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
