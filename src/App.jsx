import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing page components
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Philosophy from "./components/Philosophy/Philosophy.jsx";
import Seasonal from "./components/Seasonal/Seasonal.jsx";
import Map from "./components/Map/Map.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

// Pages
import OrderNow from "./components/OrderNow/OrderNow.jsx";
import Contact from "./components/check/Contact/Contact.jsx";
import SignIn from "./components/check/SignIn/SignIn.jsx";
import Admin from "./components/check/Admin/Admin.jsx";
import ManageMenu from "./components/check/Admin/Managemenu.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={
          <>
            <Hero />
            <Philosophy />
            <Seasonal />
            <Map />
            <Footer />
          </>
        } />

        <Route path="/order-now" element={
          <>
            <OrderNow />
            <Footer />
          </>
        } />

        <Route path="/contact-us" element={
          <>
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/sign-in" element={<SignIn />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/manage-menu" element={<ManageMenu />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;