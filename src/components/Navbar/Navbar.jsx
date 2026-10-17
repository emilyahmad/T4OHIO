import { asset } from "../../utils/asset.js";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext.js";

// How far (px) the page has to scroll before the header can hide
const HIDE_AFTER = 80;

function Navbar() {
  const { isAdmin } = useAuth();
  const [hidden, setHidden] = useState(false);

  // Hide the header when scrolling down, bring it back when scrolling up
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > HIDE_AFTER);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="navbar-spacer">
    <div className={hidden ? "navbar navbar-hidden" : "navbar"}>

      <div className="white-circles">
        <div className="first-circle">
          <img src={asset("img/navbar/logo-circle.png")}
          alt="the T4 Icon with a white border"/>
        </div>
        <div className="second-circle">
          <img src={asset("img/navbar/circle2.png")}
          alt="a small white circle"/>
        </div>
      </div>
      
      <div className="page-name">
        <Link to="/">Home</Link>
        <Link to="/philosophy">Philosophy</Link>
        <Link to="/order-now">Order Now</Link>
        {/* Customers never see a login link; the owner bookmarks /admin, which asks them to sign in */}
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

    </div>
    </div>

  );
}

export default Navbar;