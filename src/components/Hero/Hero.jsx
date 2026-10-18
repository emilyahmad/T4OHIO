import "./Hero.css";
import HeroVideo from "./HeroVideo.jsx";
import { useEffect, useState } from "react";

// How long (ms) each image stays up before fading to the next
const SLIDE_MS = 6000;

// Pass `video` (a YouTube video id) to fill the whole hero with a looping, muted video behind the text,
// or `backgroundImage` to fill it with an image instead (pass an array of images to crossfade between them). `centered` puts the text in the middle.
function Hero({showMobile, name, subtitle1, subtitle2, image, imageAlt, style, video, backgroundImage, centered}) {
  const slides = Array.isArray(backgroundImage) ? backgroundImage : null;
  const [slide, setSlide] = useState(0);
  const fullBleed = video || backgroundImage;

  useEffect(() => {
    if (!slides || slides.length < 2) return;
    const timer = setInterval(() => setSlide((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [slides?.length]);
  const classes = ["hero-container", fullBleed && "hero-has-video", centered && "hero-centered"].filter(Boolean).join(" ");

  return (
    <div className={showMobile}>
      <section className={classes}>
        {video && <HeroVideo video={video} title={imageAlt} />}
        {slides && (
          <div className="hero-video-bg" role="img" aria-label={imageAlt}>
            {slides.map((src, i) => (
              <div key={src} className={i === slide ? "hero-slide hero-slide-active" : "hero-slide"}
              style={{ backgroundImage: `url(${src})` }}/>
            ))}
          </div>
        )}
        {backgroundImage && !slides && (
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