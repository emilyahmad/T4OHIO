import "./Map.css";

function Map() {
    return (
        <div className="map">
            <h2>Store location</h2>
            {/* link isn't working */}
            <iframe id="map" width="100%" height="650px" 
            frameborder="0" style="border:0" 
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB2NIWI3Tv9iDPrlnowr_0ZqZWoAQydKJU&q=T4%20(Tea%20For%20U)%20Bubble%20Tea%20Cafe%20SnackBar%2C%20Dayton%20Lebanon%20Pike%2C%20Dayton%2C%20OH%2C%20USA&maptype=roadmap" 
            allowfullscreen></iframe>
        </div>
    );
}

export default Map;