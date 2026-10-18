import { GOOGLE_REVIEWS_URL } from "../../data/siteContent.js";
import "./Footer.css"
import { Link } from "react-router-dom";

const PHONE = "+1(937)-723-9941";
const EMAIL = "T4swOhio@gmail.com";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <nav className="footer-col" aria-label="Explore">
                    <h4>Explore</h4>
                    <ul>
                        <li><Link to="/order-now">Order Now</Link></li>
                        <li><Link to="/philosophy">Philosophy</Link></li>
                    </ul>
                </nav>
                <nav className="footer-col" aria-label="More">
                    <h4>More</h4>
                    <ul>
                        <li><a href="https://www.t4.com.tw/en/Store">More Locations</a></li>
                        <li><a href="https://www.t4.com.tw/en/Franchising1">Franchising</a></li>
                        <li><a href={GOOGLE_REVIEWS_URL}>Leave a Review</a></li>
                    </ul>
                </nav>
                <div className="footer-col footer-connect">
                    <h4>Connect with us</h4>
                    <ul>
                        <li><a href="tel:+19377239941">{PHONE}</a></li>
                        <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                    </ul>
                </div>
            </div>
            {/* Thin bar along the bottom: copyright on the left, social icons on the right */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} T4 Ohio · Tea For U</p>
                <ul className="footer-social">
                    <li><a href="https://www.instagram.com/t4ohio/" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="https://www.facebook.com/T4DAYTON/" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href={`mailto:${EMAIL}`} aria-label="Email"><i className="fa-regular fa-envelope"></i></a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer
