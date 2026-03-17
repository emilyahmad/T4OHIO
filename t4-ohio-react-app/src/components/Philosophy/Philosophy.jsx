import "./Philosophy.css";

function Philosophy() {
    return (
        <div className="philosophy">
            <h2>Philosophy</h2>
            <div className="cards">
                <div className="philosophy-section">
                    <h3>Fresh: Purity & Handmade</h3>
                    <h6>Selected from supreme tea of Taiwan —"Jadeite Royal Tea", is the base of T4 novel tea series. Thanks to rigorous rolling technique of tea masters, modern temperature and humidity control technology, and hand baking for aroma, richness, profundity and beauty, we've accomplished a cup of fine tea to bring to your.</h6>
                    <img id="fresh-img" src="https://senchateabar.com/cdn/shop/articles/5dc19c07ff88ca1f5034d854_photo-1561296180-e8100fd714e2-2_1610x.jpeg?v=1596745991"></img>
                </div>
                <div className="philosophy-section">
                    <img id="fashion-img" src="https://images.unidays.world/i/perks/native/raw-banner/77939418-81c6-4bd1-b1ff-e32b1dc3c4d4?w=3840&format=webp"></img>
                    <h3>Fashion: Vogue & Vigor</h3>
                    <h6>T4 sets its high standards over the fine teas and will surprise you with every drink you received, a sparkling gem.</h6>
                </div>
                <div className="philosophy-section">
                    <h3>Favor: Warm & Fine</h3>
                    <h6>T4's hand-shaken, fresh-brews drinks are handling with passion and care. We believe careful crafted tea and delicious food can connect people and create precious moments. We proudly serve to excellent for every customers.</h6>
                    <img id="flavor-img" src="https://res.cloudinary.com/westfielddg/image/upload/w_1500/f_auto/q_auto/westfield-media/uk/retailer/logo-background-image/rfky8gac26iicv47fhco.png"></img>
                </div>
                <div className="philosophy-section">
                    <img src="https://tb-static.uber.com/prod/image-proc/processed_images/86ee2ec6603e371f6a8f475b3eba7697/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg"></img>
                    <h3>Flavor: Cozy & Relish</h3>
                    <h6>We carefully select all fine ingredients to present true flavors for your taste. Using pure cane sugar to reduce 25% of regular sugar's calories. Additionally, we offer customized sweetness levels for our customers. Making one cup at a time to ensure each cup is crafted and customized to your liking.</h6>
                </div>
            </div>
        </div>
    );
}

export default Philosophy;