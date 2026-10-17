import { asset } from "../../utils/asset.js";
import "./Seasonal.css";

// The owner edits these cards from Admin → Front Page (see data/siteContent.js).
function Seasonal({ title, cards }) {
    return (
        <div className="seasonal">
            <h1>{title}</h1>
            <div className="seasonal-cards">
                {cards.filter(card => card.visible).map((card) => (
                    <img className="card" key={card.id} src={asset(card.image)} alt={card.alt}/>
                ))}
            </div>
        </div>
    );
}

export default Seasonal;
