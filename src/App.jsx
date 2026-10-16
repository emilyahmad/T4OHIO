import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { asset } from "./utils/asset.js";
import { useSiteContent } from "./data/siteContent.js";

// Landing page components
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Philosophy from "./components/Philosophy/Philosophy.jsx";
import Seasonal from "./components/Seasonal/Seasonal.jsx";
import Map from "./components/Map/Map.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import Reviews from "./components/Reviews/Reviews.jsx";

// Pages
import OrderNow from "./components/OrderNow/OrderNow.jsx";
import Contact from "./components/check/Contact/Contact.jsx";
import SignIn from "./components/check/SignIn/SignIn.jsx";
import AdminLayout from "./components/check/Admin/AdminLayout.jsx";
import Admin from "./components/check/Admin/Admin.jsx";
import ManageMenu from "./components/check/Admin/Managemenu.jsx";
import ManageFrontPage from "./components/check/Admin/ManageFrontPage.jsx";
import ResetPassword from "./components/check/SignIn/ResetPassword.jsx";

// Auth
import AuthProvider from "./auth/AuthProvider.jsx";
import RequireAdmin from "./auth/RequireAdmin.jsx";

// The hero and seasonal sections come from the database so the owner can edit them.
function Home() {
  const { content, loading } = useSiteContent();
  const { hero, seasonal } = content;

  return (
    <>
      {loading ? <div style={{ minHeight: "60vh" }} /> : (
        <Hero
          name={hero.title}
          subtitle1={hero.subtitle1}
          subtitle2={hero.subtitle2}
          imageAlt={hero.alt}
          image={asset(hero.image)}
        />
      )}
      <Philosophy />
      {!loading && <Seasonal title={seasonal.title} subtitle={seasonal.subtitle} cards={seasonal.cards} />}
      <Map />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/order-now" element={
          <>
            <OrderNow />
            <Footer />
          </>
        } />

        <Route path="/contact-us" element={
          <>
            <Hero
              showMobile="hide-mobile"
              name="Contact Us"
              subtitle1="Fill out the form below, we will get back to you shortly!"
              subtitle2=""
              imageAlt="Three beverage service (bobaristas), two holding drink shakers and one in the middle holding a yellow drink."
              image="https://www.t4.com.tw/en/image/join1_lgpic.png"
              style={{marginRight: "7rem", width: "32.5%"}}
              />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/sign-in" element={
          <>
            <Hero
              showMobile="hide-mobile"
              name="Sign In"
              subtitle1="For store owners & website admin"
              subtitle2=""
              imageAlt="Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
              image="https://www.t4.com.tw/en/image/contact_pic2.png"
              style={{marginRight: "12rem", width: "25%"}}
            />
            <SignIn />
            <Footer />
          </>
        } />

        <Route path="/reset-password" element={
          <>
            <ResetPassword />
            <Footer />
          </>
        } />

        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Admin />} />
          <Route path="menu" element={<ManageMenu />} />
          <Route path="front-page" element={<ManageFrontPage />} />
          <Route path="manage-menu" element={<Navigate to="/admin/menu" replace />} />
        </Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;