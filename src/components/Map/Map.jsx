import "./Map.css";

function Map() {
    return (
        <div className="map">
            <h1>Store Information</h1>
            <div className="store-info-media">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.7001210515964!2d-84.16215212398288!3d39.61143727158048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88408f83aaac65af%3A0xa78426d198186c18!2sT4%20(Tea%20For%20U)%20Bubble%20Tea%20Cafe%20SnackBar!5e0!3m2!1sen!2sus!4v1774737859207!5m2!1sen!2sus"
                    width="800" height="600"
                    style={{ border: "0" }}
                    allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                <div className="store-info-text">
                    <h3>Visit us at</h3>
                    <h4>
                        9146 Dayton-Lebanon Pike (RT-48)
                        <br></br>
                        Centerville OH 45458
                    </h4>
                    <br></br>
                    <br></br>
                    <h3>Store Hours</h3>
                    <h4>Open 11 AM - 7 PM everyday
                    <br></br>
                    Closed on Mondays</h4>
                </div>
            </div>
        </div>
    );
}

export default Map;