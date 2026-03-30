import "./Seasonal.css";

function Seasonal() {
    const cards = [
        {
            key: 1,
            image: "public/img/posters/poster1.png",
            alt: "change",
            description: "A rich blend of coffee and chocolate frappe layered with creamy sweetness and hints of soaked ladyfinger biscuits. Smooth, indulgent, and perfectly reminiscent of the classic Italian dessert."
        },
        {
            key: 2,
            image: "public/img/posters/poster2.png",
            alt: "change",
            description: "Velvety milk tea swirled with luscious cake cream and topped with chewy boba pearls for the perfect bite and sip. A playful fusion of dessert and drink that’s both creamy and satisfying."
        },
        {
            key: 3,
            image: "public/img/posters/poster3.png",
            alt: "change",
            description: "Bold coffee topped with a silky sea salt cream crown, balancing deep roasted flavors with a lightly savory finish. Smooth, refreshing, and irresistibly layered in every sip."
        },

    ]

    return (
        <div className="seasonal">
            <div className="seasonal-header">
                <h1>Seasonal</h1>
                <h2>Drinks, upcoming events and promotions will be
                    <br></br>
                    shown here/we will update this</h2>
            </div>
            <div className="seasonal-cards">
                {cards.map((card) => (
                    <div className="card" key={card.key}>
                        <img src={card.image} alt={card.alt}/>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Seasonal;