import "./Seasonal.css";

function Seasonal() {
    const cards = [
        {
            key: 1,
            image: "T4OHIO/public/img/posters/poster1.png",
            alt: "change",
            description: "some more information about whatever is in the photo whatever is in the photo"
        },
        {
            key: 2,
            image: "T4OHIO/public/img/posters/poster2.png",
            alt: "change",
            description: "some more information about whatever is in the photo whatever is in the photo"
        },
        {
            key: 3,
            image: "T4OHIO/public/img/posters/poster3.png",
            alt: "change",
            description: "some more information about whatever is in the photo whatever is in the photo"
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