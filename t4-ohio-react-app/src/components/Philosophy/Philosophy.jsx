import "./Philosophy.css";

function PhilosophyCard({ title, description }) {
  return (
    // switch to empty fragment & just use
    // class names from within Philosophy function
    <div className="philosophy-section">
      <h4>{title}</h4>
      <h6>{description}</h6>
    </div>
  );
}

function PhilosophyImg({ image, imageAlt, imageClass }) {
  return (
    <div className="philosophy-images">
      <img className={imageClass} src={image} alt={imageAlt} />
    </div>
  );
}

function Philosophy() {
  const philosophyItems = [
    {
      title: "Fresh: Purity & Handmade",
      description:
        'Selected from supreme tea of Taiwan — "Jadeite Royal Tea", is the base of T4 novel tea series. Thanks to rigorous rolling technique of tea masters, modern temperature and humidity control technology, and hand baking for aroma, richness, profundity and beauty, we\'ve accomplished a cup of fine tea to bring to you.',
      image: "img/philo/philo-fresh.png",
      imageAlt: "Fresh green tea leaves growing in sunlight",
      imageClass: "fresh-img",
    },
    {
      title: "Fashion: Vogue & Vigor",
      description:
        "T4 sets its high standards over the fine teas and will surprise you with every drink you receive, a sparkling gem.",
      image: "img/philo/philo-fashion.png",
      imageAlt: "Person holding two colorful tea drinks",
      imageClass: "fashion-img",
    },
    {
      title: "Favor: Warm & Fine",
      description:
        "T4's hand-shaken, fresh-brewed drinks are handled with passion and care. We believe carefully crafted tea and delicious food can connect people and create precious moments. We proudly strive for excellence for every customer.",
      image: "img/philo/philo-favor.png",
      imageAlt: "Close-up of iced milk tea with tapioca pearls",
      imageClass: "favor-img",
    },
    {
      title: "Flavor: Cozy & Relish",
      description:
        "We carefully select all fine ingredients to present true flavors for your taste. Using pure cane sugar reduces 25% of regular sugar's calories. Additionally, we offer customized sweetness levels for our customers, making one cup at a time to ensure each drink is crafted to your liking.",
      image: "img/philo/philo-flavor.png",
      imageAlt: "Variety of bubble tea drinks with toppings",
      imageClass: "flavor-img",
    },
  ];

  return (
    <section className="philosophy">
      <h2>Philosophy</h2>
      
        <div className="cards-images">
            {philosophyItems.map((item) => (
            <PhilosophyImg
                key={item.image}
                image={item.image}
                imageAlt={item.imageAlt}
                imageClass={item.imageClass}
            />
            ))}
        </div>

        <div className="cards">
            {philosophyItems.map((item) => (
            <PhilosophyCard
                key={item.title}
                title={item.title}
                description={item.description}
            />
            ))}
        </div>
    </section>
  );
}

export default Philosophy;