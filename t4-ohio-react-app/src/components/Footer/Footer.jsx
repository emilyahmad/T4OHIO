import "./Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="logo-section">
                <img className="footer-logo" src="public/img/t4-footer.png"/>
            </div>
            <div className="footer-sections">
                <div className="left-footer-col">
                    <h4>T4 (Tea For U) boba's mission is to spread joy and connect people worldwide through high-quality, authentic Taiwanese tea. Founded in 2004, their philosophy is to serve "A cup of TEA FOR you," focusing on freshly brewed whole-leaf tea rather than powders, emphasizing freshness, fashion, favor, and flavor.</h4>
                    <div className="button-top"
                    onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
                        <h3>Back to top</h3>
                    </div>
                </div>
                <div className="footer-col1">
                    <ul>
                        <li><a href="#ordernow">Order Now</a></li>
                        <li><a href="#ordernow">Contact Us</a></li>
                        <li><a href="#ordernow">Sign In</a></li>
                        <li><a href="https://www.instagram.com/t4ohio/"><i className="fa-brands fa-instagram"></i></a></li>
                        <li><a href="https://www.facebook.com/T4DAYTON/"><i className="fa-brands fa-facebook"></i></a></li>
                    </ul>
                </div>
                <div className="footer-col2">
                    <ul>
                        <li><a href="https://www.t4.com.tw/en/Store">More Locations</a></li>
                        <li><a href="https://www.t4.com.tw/en/Franchising1">Franchising</a></li>
                        <li><a href="https://www.google.com/maps/place/T4+(Tea+For+U)+Bubble+Tea+Cafe+SnackBar/@39.6114373,-84.1621521,17z/data=!4m8!3m7!1s0x88408f83aaac65af:0xa78426d198186c18!8m2!3d39.6114373!4d-84.1595772!9m1!1b1!16s%2Fg%2F11t639bf79?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D">Leave a Review</a></li>
                        <li><a href="#email"><i className="fa-regular fa-envelope"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        
    );
}

export default Footer

{/* +1(937)-723-9941 */}
{/* T4swOhio@gmail.com */}