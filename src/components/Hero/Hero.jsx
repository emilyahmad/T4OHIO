import "./Hero.css";
import HeroVideo from "./HeroVideo.jsx";

// Pass `video` (a YouTube video id) to fill the whole hero with a looping, muted video behind the text
function Hero({showMobile, name, subtitle1, subtitle2, image, imageAlt, style, video}) {
  return (
    <div className={showMobile}>
      <section className={video ? "hero-container hero-has-video" : "hero-container"}>
        {video && <HeroVideo video={video} title={imageAlt} />}
        <div className="hero-text-container">
          <h1 className="title">{name}</h1>
          <h4>{subtitle1}</h4>
          <h4>{subtitle2}</h4>
        </div>
        {!video && (
          <img alt={imageAlt}
          src={image}
          style={style}
          />
        )}
      </section>
    </div>
  );
}

export default Hero;