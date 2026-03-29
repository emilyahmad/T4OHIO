import "./Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="logo-section">
                <img className="footer-logo" src="public/img/t4-footer.png"/>
            </div>
            <div className="footer-sections">
                <div className="left-footer-col">
                    <h4>We believe that moving and delicious food can connect people with happy memories. Being able to share good things with people is joyful and blessing; we know better how to share, how to learn, and how to care.And all of it starts with "a good cup of tea. "We wish our work, can drive every sincere and free heart, and bring more flavors and happiness to every one ‘s daily life.</h4>
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
            <img className="baristas" src="https://www.t4.com.tw/en/image/join1_lgpic.png"/>
        </div>
        
    );
}

export default Footer

{/* +1(937)-723-9941 */}
{/* T4swOhio@gmail.com */}