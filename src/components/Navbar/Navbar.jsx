import { asset } from "../../utils/asset.js";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext.js";

// How far (px) the page has to scroll before the header can hide
const HIDE_AFTER = 80;

function Navbar() {
  const { isAdmin } = useAuth();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className={`navbar${hidden && !open ? " navbar-hidden" : ""}${open ? " navbar-open" : ""}`}>

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
      
      <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <img src={asset("img/navbar/logo-circle.png")} alt="T4 home" />
      </Link>
      <button
        type="button"
        className="nav-burger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>

      <div className="page-name" onClick={() => setOpen(false)}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/philosophy">Philosophy</NavLink>
        <NavLink to="/order-now">Order Now</NavLink>
        {/* Customers never see a login link; the owner bookmarks /admin, which asks them to sign in */}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </div>

    </div>
    </div>

  );
}

export default Navbar;