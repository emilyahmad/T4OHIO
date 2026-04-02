import "./Seasonal.css";

function Seasonal() {
    const cards = [
        {
            key: 1,
            image: "/img/posters/poster1.png",
            alt: "A poster of a tiramisu frappe boba drink",
            description: "A rich and creamy milk tea layered with soft cake textures and chewy boba for a perfectly indulgent treat."
        },
        {
            key: 2,
            image: "/img/posters/poster2.png",
            alt: "A poster of a boba cake milk tea drink",
            description: "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory."
        },
        {
            key: 3,
            image: "/img/posters/poster3.png",
            alt: "A poster of a cream crown sea salt coffee boba tea drink",
            description: "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory."
        },

    ]

    return (
        <div className="seasonal">
            <div className="seasonal-header">
                <h1>Seasonal</h1>
                <h2 className="seasonal-subtitle">Stay up-to-date with new and drinks, snacks, upcoming
                    <br></br>
                    events and promotions</h2>
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