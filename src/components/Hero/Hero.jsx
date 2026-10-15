import "./Hero.css";

function Hero({showMobile, name, subtitle1, subtitle2, image, imageAlt, style}) {
  return (
    <div className={showMobile}>
      <section className="hero-container">
        <div className="hero-text-container">
          <h1 className="title">{name}</h1>
          <h4>{subtitle1}</h4>
          <h4>{subtitle2}</h4>
        </div>
        <img alt={imageAlt}
        src={image}
        style={style}
        />
      </section>
    </div>
  );
}

export default Hero;