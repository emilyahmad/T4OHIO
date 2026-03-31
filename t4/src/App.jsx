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
            <Hero
              name="T4 Ohio"
              subtitle1="A cup of tea for you"
              subtitle2="清茶达人"
              imageAlt="Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
              image="public/img/hero-img.png"
            />
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
            <Hero
              name="Contact Us"
              subtitle1="A cup of tea for you"
              subtitle2="清茶达人"
              imageAlt="Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
              image="https://www.t4.com.tw/en/image/join1_lgpic.png"
            />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/sign-in" element={
          <>
            <Hero
              name="Sign In"
              subtitle1="A cup of tea for you"
              subtitle2="清茶达人"
              imageAlt="Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
              image="https://www.t4.com.tw/en/image/contact_pic2.png"
            />
            <SignIn />
          </>
        } />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/manage-menu" element={<ManageMenu />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;