import {useState} from "react";

import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Philosophy from "./components/Philosophy/Philosophy.jsx";
import Seasonal from "./components/Seasonal/Seasonal.jsx";
import Map from "./components/Map/Map.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

import Quiz from "./components/Quiz/Quiz.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Quiz />
      {/* <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Hero isOpen={isOpen} />
      <Philosophy />
      <Seasonal />
      <Map />
      <Reviews />
      <Footer /> */}

    </>
  );
}

export default App;