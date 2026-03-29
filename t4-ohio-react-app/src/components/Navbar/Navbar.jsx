import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="white-circles">
        <div className="first-circle">
          <img src="public/img/navbar/logo-circle.png"/>
        </div>
        <div className="second-circle">
          <img src="public/img/navbar/circle2.png"/>
        </div>
      </div>
      <div className="page-name">
        <Link to="/">Home</Link>
        <Link to="/order-now">Order Now</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Sign In</Link>
      </div>

    </div>

  );
}

export default Navbar;