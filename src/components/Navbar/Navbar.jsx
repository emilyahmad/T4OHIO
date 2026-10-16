import { asset } from "../../utils/asset.js";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.js";

function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <div className="navbar">

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
        <Link to="/order-now">Order Now</Link>
        <Link to="/contact-us">Contact</Link>
        {/* Customers never see a login link; the owner bookmarks /admin, which asks them to sign in */}
        {isAdmin && <Link to="/admin">Admin</Link>}
      </div>

    </div>

  );
}

export default Navbar;