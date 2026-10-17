import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { asset } from "./utils/asset.js";
import { useSiteContent, DEFAULT_CONTENT } from "./data/siteContent.js";
import { youtubeId } from "./utils/youtube.js";

// Landing page components
import Hero from "./components/Hero/Hero.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Philosophy from "./components/Philosophy/Philosophy.jsx";
import Seasonal from "./components/Seasonal/Seasonal.jsx";
import Promotions from "./components/Promotions/Promotions.jsx";
import Map from "./components/Map/Map.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScrollFade from "./components/ScrollFade/ScrollFade.jsx";
import ClickBurst from "./components/ClickBurst/ClickBurst.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

// Pages
import OrderNow from "./components/OrderNow/OrderNow.jsx";
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
  const { hero, seasonal, promotions, reviews } = content;

  return (
    <>
      {loading ? <div style={{ minHeight: "60vh" }} /> : (
        <Hero
          name={hero.title}
          subtitle1={hero.subtitle1}
          subtitle2={hero.subtitle2}
          imageAlt={hero.alt}
          video={youtubeId(hero.video) || youtubeId(DEFAULT_CONTENT.hero.video)}
        />
      )}
      {!loading && <Promotions title={promotions.title} images={promotions.images} />}
      {!loading && <Seasonal title={seasonal.title} cards={seasonal.cards} />}
      {!loading && <Reviews title={reviews.title} reviews={reviews.reviews} />}
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
      <ScrollFade />
      <ClickBurst />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/order-now" element={
          <>
            <Hero
              name="Our Menu"
              subtitle1="Handcrafted teas, made just the way you like them."
              subtitle2=""
              imageAlt="A T4 team member holding out an iced milk tea with boba."
              backgroundImage={asset("img/video.png")}
              centered
            />
            <OrderNow />
            <Footer />
          </>
        } />

        <Route path="/philosophy" element={
          <>
            <Hero
              name="Our Philosophy"
              subtitle1="From leaf to cup, every step is done with care."
              subtitle2=""
              imageAlt="Several T4 drinks with teal lids on a wooden tray, including a milk tea with boba."
              backgroundImage={asset("img/philo-video.png")}
              centered
            />
            <Philosophy />
            <Footer />
          </>
        } />

        {/* The contact page was removed; old links go to the home page */}
        <Route path="/contact-us" element={<Navigate to="/" replace />} />

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