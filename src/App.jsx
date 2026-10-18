import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { asset } from "./utils/asset.js";
import { useSiteContent, DEFAULT_CONTENT } from "./data/siteContent.js";
import { youtubeId } from "./utils/youtube.js";
import { trackVisit } from "./lib/analytics.js";

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
import BobaQuiz from "./components/BobaQuiz/BobaQuiz.jsx";

// Pages
import OrderNow from "./components/OrderNow/OrderNow.jsx";
import SignIn from "./components/check/SignIn/SignIn.jsx";
import AdminLayout from "./components/check/Admin/AdminLayout.jsx";
import Admin from "./components/check/Admin/Admin.jsx";
import ManageMenu from "./components/check/Admin/Managemenu.jsx";
import ManageFrontPage from "./components/check/Admin/ManageFrontPage.jsx";
import Insights from "./components/check/Admin/Insights.jsx";
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
      {!loading && <BobaQuiz />}
      {!loading && <Seasonal title={seasonal.title} cards={seasonal.cards} />}
      {!loading && <Reviews title={reviews.title} reviews={reviews.reviews} />}
      <Map />
      <Footer />
    </>
  );
}

// Start each page at the top when navigating (e.g. from a footer link)
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  // Count the visit, but not the owner signing in or working in the admin
  useEffect(() => {
    if (!/\/(admin|sign-in|reset-password)/.test(location.pathname)) trackVisit();
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
      <ScrollToTop />
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
              imageAlt="Tea bushes on misty, forested hillsides: bright green rolling hills, and a tea picker working among curved rows."
              backgroundImage={[
                "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
                "https://images.unsplash.com/photo-1787367897869-a4bae7219bc7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
              ]}
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
          <Route path="insights" element={<Insights />} />
          <Route path="manage-menu" element={<Navigate to="/admin/menu" replace />} />
        </Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;