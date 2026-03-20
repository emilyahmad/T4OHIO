import "./Footer.css"

function Footer() {
    return (
        <>
        <div className="footer">
            <div className="logo-section">
                {/* add scale/hover effect */}
                <img className="footer-logo" src="img/logo.png"></img>
                <h2>Tea 4 U</h2>
            </div>
            <div className="footer-sections">
                <div className="left-footer-col">
                    <h4>T4 (Tea For U) boba's mission is to spread joy and connect people worldwide through high-quality, authentic Taiwanese tea. Founded in 2004, their philosophy is to serve "A cup of TEA FOR you," focusing on freshly brewed whole-leaf tea rather than powders, emphasizing freshness, fashion, favor, and flavor.</h4>
                    <div className="button-top">
                        <h3>Back to top</h3>
                    </div>
                </div>
                <div className="footer-col1">
                    <h3>Site map</h3>
                    <h3>Menu</h3>
                    <h3>Order now</h3>
                    <h3>Contact Us</h3>
                    <h3>Sign in</h3>
                </div>
                <div className="footer-col2">
                    <h3>Site map</h3>
                    <h3>Menu</h3>
                    <h3>Order now</h3>
                    <h3>Contact Us</h3>
                    <h3>Sign in</h3>
                </div>

            </div>




        </div>
        </>
    );
}

export default Footer