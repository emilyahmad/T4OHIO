import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="white-circles">
        <div className="first-circle">
          <img src="/img/navbar/logo-circle.png"
          alt="the T4 Icon with a white border"/>
        </div>
        <div className="second-circle">
          <img src="/img/navbar/circle2.png"
          alt="a small white circle"/>
        </div>
      </div>
      <div className="page-name">
        <Link to="/">Home</Link>
        <Link to="/order-now">Order Now</Link>
        <Link to="/contact-us">Contact</Link>
        <Link to="/sign-in">Sign In</Link>
      </div>

    </div>

  );
}

export default Navbar;