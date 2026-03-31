import "./Hero.css";

function Hero({name, subtitle1, subtitle2, image, imageAlt}) {
  return (
    <section className="hero-container">
      <div className="hero-text-container">
        <h1 className="title">{name}</h1>
        <h4>{subtitle1}</h4>
        <h4>{subtitle2}</h4>
      </div>
      <img alt={imageAlt}
      src={image}
      style={style}/>
    </section>
  );
}

export default Hero;