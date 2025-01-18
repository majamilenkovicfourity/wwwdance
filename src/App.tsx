import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/app.scss";

// import HomePage from "./components/HomePage";
// import "./styles/app.scss";
import { Footer } from "./components/Footer";
import NavBar from "./components/NavBar";
// import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* {<Route path="/contact" element={<Contact />} />}{" "} */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
