import "./Navbar.css";

function Navbar({ isOpen, setIsOpen }) {
  return (
    <>
    {!isOpen && (
      <i
        className="fa-solid fa-bars"
        onClick={() => setIsOpen(true)}
      ></i>
    )}

      {isOpen && (
        <div className="navbar">
          <i
            className="fa-solid fa-x"
            onClick={() => setIsOpen(false)}
          ></i>

          <h3><a href="https://emilyahmad.github.io/T4OHIO/menu.html">Menu</a></h3>
          <h3><a href="https://emilyahmad.github.io/T4OHIO/orderNow.html">Order Now</a></h3>
          <h3><a href="https://emilyahmad.github.io/T4OHIO/contact.html">Contact Us</a></h3>
          <h3><a href="https://emilyahmad.github.io/T4OHIO/accounts.html">Sign In</a></h3>
        </div>
      )}
    </>
  );
}

export default Navbar;