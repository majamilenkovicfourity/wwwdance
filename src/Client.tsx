import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Competitions from "./components/Competitions";
import { Dancewear } from "./components/Dancewear";
import Footer from "./components/Footer";

function ClientApp() {
  return (
    <div className="parent">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/dancewear" element={<Dancewear />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default ClientApp;
