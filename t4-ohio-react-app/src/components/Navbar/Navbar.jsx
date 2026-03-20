import "./Navbar.css";
import React,{useState} from 'react';

function Navbar() {
    const[toggle, setToggle] = useState(true)
    return (
        <>

        <i class="fa-solid fa-bars"></i>
        

        {/* on mobile:
        toggle menu ->
        hide T4 title
        show X
        show navbar
        
        toggle X
        show title
        hide navbar
        hide X */}
        <div className="navbar">
            <i class="fa-solid fa-x"></i>
            
            <h3 id="menu"><a href="https://emilyahmad.github.io/T4OHIO/menu.html">Menu</a></h3>
            <h3 id="order"><a href="https://emilyahmad.github.io/T4OHIO/orderNow.html">Order Now</a></h3>
            <h3 id="contact"><a href="https://emilyahmad.github.io/T4OHIO/contact.html">Contact Us</a></h3>
            <h3 id="sign"><a href="https://emilyahmad.github.io/T4OHIO/accounts.html">Sign In</a></h3>
        </div>
        </>
    );
}

export default Navbar;