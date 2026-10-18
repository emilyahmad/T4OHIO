import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollFade.css";

// Text that fades in as it scrolls into view
const TEXT = "h1, h2, h3, h4, p";
// Places where text should just show up normally
const SKIP = ".navbar, .adm-shell, .modal-container, .quiz-backdrop, .map, .footer";

// Renders nothing; it watches the page and tags text so ScrollFade.css can fade it in
function ScrollFade() {
  const { pathname } = useLocation();

  // A layout effect runs before the browser paints, so text is hidden before it's ever shown
  // (with a plain effect it would flash on screen and then fade out before fading back in)
  useLayoutEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-text-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const tagText = () => {
      document.querySelectorAll(TEXT).forEach((el) => {
        // Text that has already faded in stays as it is. Text that was hidden but hasn't faded in yet
        // is watched again: this effect re-runs (on page changes, and twice in development), and a
        // previous run's watcher is disconnected, which used to leave that text invisible for good.
        if (el.classList.contains("fade-text-visible") || el.closest(SKIP)) return;
        el.classList.add("fade-text");
        observer.observe(el);
      });
    };

    tagText();

    // Some content (hero, seasonal, menu) loads from the database after the page renders
    let frame;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tagText);
    });
    mutations.observe(document.getElementById("root"), { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default ScrollFade;
