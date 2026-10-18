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

// How long (ms) to keep the thumbnail up after playback starts. YouTube shows its pause button for
// about 3.5s after autoplay begins, then hides it; this covers that.
const REVEAL_DELAY = 4000;

// A YouTube video that behaves like a background: muted, looping, and only shown while it's
// actually playing. Any other time (loading, paused, autoplay blocked) the thumbnail shows
// instead, so YouTube's play/pause buttons and black loading screen never appear.
function HeroVideo({ video, title }) {
  const iframeRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let player;
    let loopTimer;
    let revealTimer;
    let retryTimer;
    let cancelled = false;

    // If the browser blocked autoplay, the first tap/click/scroll counts as a user gesture and lets it start
    const gestures = ["pointerdown", "touchstart", "keydown", "scroll"];
    const startOnGesture = () => {
      if (player?.getPlayerState?.() !== window.YT?.PlayerState.PLAYING) {
        player?.mute?.();
        player?.playVideo?.();
      }
    };
    gestures.forEach((e) => window.addEventListener(e, startOnGesture, { passive: true }));

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      player = new YT.Player(iframeRef.current, {
        events: {
          onReady: () => {
            player.mute();
            player.playVideo();
            // Autoplay can be ignored (slow start, Safari, low power mode), so keep nudging it
            // until it's actually playing
            let attempts = 0;
            retryTimer = setInterval(() => {
              if (player.getPlayerState?.() === YT.PlayerState.PLAYING || ++attempts > 20) {
                clearInterval(retryTimer);
                return;
              }
              player.mute();
              player.playVideo();
            }, 500);
          },
          onStateChange: ({ data }) => {
            // Buffering keeps whatever is showing; the video only appears once it's really playing,
            // and only after YouTube has hidden the pause button it shows when playback starts
            if (data === YT.PlayerState.PLAYING) {
              clearTimeout(revealTimer);
              revealTimer = setTimeout(() => setPlaying(true), REVEAL_DELAY);
            } else if (data !== YT.PlayerState.BUFFERING) {
              clearTimeout(revealTimer);
              setPlaying(false);
            }
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
      clearInterval(retryTimer);
      clearTimeout(revealTimer);
      gestures.forEach((e) => window.removeEventListener(e, startOnGesture));
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
