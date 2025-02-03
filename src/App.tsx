import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/app.scss";
import "./index.css";

import HomePage from "./components/HomePage";

import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Competitions from "./components/Competitions";

function App() {
  return (
    <Router basename="/wwwdance">
      <div className="parent">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/*  <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/competitions" element={<Competitions />} />*/}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
