import {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing page components
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Philosophy from "./components/Philosophy/Philosophy.jsx";
import Seasonal from "./components/Seasonal/Seasonal.jsx";
import Map from "./components/Map/Map.jsx";
import Footer from "./components/Footer/Footer.jsx";

import OrderNow from "./components/OrderNow/OrderNow.jsx";

import Reviews from "./components/Reviews/Reviews.jsx";

import Quiz from "./components/Quiz/Quiz.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
          {/* Load home page components */}
            <Hero/>
            <Philosophy/>
            <Seasonal/>
            <Map/>
            <Footer/>
          </>
        } />

        <Route path="/order-now" element={
          <>
          {/* Load order now components */}
          <OrderNow/>
          <Footer/>
          </>
        } />

        <Route path="/contact" element={
          <>
          {/* load contact components */}
          <Footer/>
          </>
        } />

        <Route path="/sign-in" element={
          <>
          {/* sign in components */}
          <Footer/>
          </>
        } />

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

// function App() {
//   return (
//     <Navbar/>
//     // <BrowserRouter>
//     // <Navbar/>
//     // <Routes>
//     //     <Route path="/" element={
//     //       <>
//     //         <Hero />
//     //         <Philosophy />
//     //         <Seasonal />
//     //         <Map />
//     //         <Footer />
//     //       </>
//     //     } />
//     //     <Route path="/order-now" element={<OrderNow />} />
//     //   </Routes>
//     // </BrowserRouter>
//   );
// }

// export default App;