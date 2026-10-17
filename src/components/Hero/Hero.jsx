import "./Hero.css";
import HeroVideo from "./HeroVideo.jsx";

// Pass `video` (a YouTube video id) to fill the whole hero with a looping, muted video behind the text,
// or `backgroundImage` to fill it with an image instead. `centered` puts the text in the middle.
function Hero({showMobile, name, subtitle1, subtitle2, image, imageAlt, style, video, backgroundImage, centered}) {
  const fullBleed = video || backgroundImage;
  const classes = ["hero-container", fullBleed && "hero-has-video", centered && "hero-centered"].filter(Boolean).join(" ");

  return (
    <div className={showMobile}>
      <section className={classes}>
        {video && <HeroVideo video={video} title={imageAlt} />}
        {backgroundImage && (
          <div className="hero-video-bg" role="img" aria-label={imageAlt}
          style={{ backgroundImage: `url(${backgroundImage})` }}/>
        )}
        <div className="hero-text-container">
          <h1 className="title">{name}</h1>
          <h4>{subtitle1}</h4>
          <h4>{subtitle2}</h4>
        </div>
        {!fullBleed && (
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