import "./Philosophy.css";

function PhilosophyCard({title, description }) {
  return (
    // switch to empty fragment & just use
    // class names from within Philosophy function
    <div className="philosophy-section">
      {/* <h4>{title}</h4> */}
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
        'Selected from premium Taiwanese tea, including our signature "Jadeite Royal Tea." Through expert craftsmanship and precise techniques, we create a rich and aromatic cup to enjoy.',
      image: "img/philo/philo-fresh.png",
      imageAlt: "Fresh green tea leaves growing in sunlight",
      imageClass: "fresh-img",
    },
    {
      title: "Fashion: Vogue & Vigor",
      description:
        "We set high standards for our teas and craft each drink with style and care. Every cup is designed to delight and feel like a sparkling experience.",
      image: "img/philo/philo-fashion.png",
      imageAlt: "Person holding two colorful tea drinks",
      imageClass: "fashion-img",
    },
    {
      title: "Favor: Warm & Fine",
      description:
        "Our hand-shaken, fresh-brewed drinks are made with passion and care. We believe great tea brings people together and creates meaningful moments.",
      image: "img/philo/philo-favor.png",
      imageAlt: "Close-up of iced milk tea with tapioca pearls",
      imageClass: "favor-img",
    },
    {
      title: "Flavor: Cozy & Relish",
      description:
        "We carefully select high-quality ingredients to deliver authentic flavors. With customizable sweetness and thoughtful preparation, every drink is made just for you.",
      image: "img/philo/philo-flavor.png",
      imageAlt: "Variety of bubble tea drinks with toppings",
      imageClass: "flavor-img",
    },
  ];

  return (
    <section className="philosophy">
      <h2>Philosophy</h2>
      
        <div className="card-images">
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