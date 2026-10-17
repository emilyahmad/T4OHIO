import { useEffect, useRef, useState } from "react";
import "./Hero.css";

// Loads YouTube's player API once and resolves with the global YT object
let apiPromise;
function loadYouTubeApi() {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      if (window.YT?.Player) return resolve(window.YT);
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

// A YouTube video that behaves like a background: muted, looping, and only shown while it's
// actually playing. Any other time (loading, paused, autoplay blocked) the thumbnail shows
// instead, so YouTube's play/pause buttons and black loading screen never appear.
function HeroVideo({ video, title }) {
  const iframeRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let player;
    let loopTimer;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      player = new YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            player.mute();
            player.playVideo();
          },
          onStateChange: ({ data }) => {
            // Buffering keeps whatever is showing; the video only appears once it's really playing
            if (data === YT.PlayerState.PLAYING) setPlaying(true);
            else if (data !== YT.PlayerState.BUFFERING) setPlaying(false);
            // Never let it sit paused or on the end screen
            if (data === YT.PlayerState.ENDED) player.seekTo(0);
            if (data === YT.PlayerState.PAUSED || data === YT.PlayerState.ENDED) player.playVideo();
          },
        },
      });

      // Jump back to the start just before the end, so YouTube's end screen never shows
      loopTimer = setInterval(() => {
        const duration = player.getDuration?.();
        if (duration && player.getCurrentTime() > duration - 0.5) player.seekTo(0);
      }, 250);
    });

    return () => {
      cancelled = true;
      // No player.destroy(): it removes the iframe, which React still owns
      clearInterval(loopTimer);
    };
  }, [video]);

  return (
    <div className="hero-video-bg"
    style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video}/maxresdefault.jpg)` }}>
      <iframe ref={iframeRef}
      className={playing ? "hero-video-playing" : ""}
      src={`https://www.youtube.com/embed/${video}?enablejsapi=1&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&origin=${window.location.origin}`}
      title={title}
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      tabIndex={-1}
      />
    </div>
  );
}

export default HeroVideo;
