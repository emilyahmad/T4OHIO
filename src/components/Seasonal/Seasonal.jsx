import { asset } from "../../utils/asset.js";
import "./Seasonal.css";

// The owner edits these cards from Admin → Front Page (see data/siteContent.js).
function Seasonal({ title, subtitle, cards }) {
    return (
        <div className="seasonal">
            <div className="seasonal-header">
                <h1>{title}</h1>
                <h2 className="seasonal-subtitle">{subtitle}</h2>
            </div>
            <div className="seasonal-cards">
                {cards.filter(card => card.visible).map((card) => (
                    <div className="card" key={card.id}>
                        <img src={asset(card.image)} alt={card.alt}/>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Seasonal;
