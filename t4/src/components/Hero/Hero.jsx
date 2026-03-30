import "./Hero.css";

function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-text-container">
        <h1 className="title">T4 Ohio</h1>
        <h4>A cup of tea for you</h4>
        <h4>清茶达人</h4>
      </div>
      <img alt="Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
      src="/img/hero-img.png"/>
    </section>
  );
}

export default Hero;