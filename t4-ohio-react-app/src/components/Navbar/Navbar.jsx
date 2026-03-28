import "./Navbar.css";

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
        <a href="#home">Home</a>
        <a href="#order-now">Order Now</a>
        <a href="#contact">Contact</a>
        <a href="#sign-in">Sign In</a>
      </div>

    </div>

  );
}

export default Navbar;