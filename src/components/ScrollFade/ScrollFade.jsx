import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollFade.css";

// Text that fades in as it scrolls into view
const TEXT = "h1, h2, h3, h4, p";
// Places where text should just show up normally
const SKIP = ".navbar, .adm-shell, .modal-container, .map, .footer";

// Renders nothing; it watches the page and tags text so ScrollFade.css can fade it in
function ScrollFade() {
  const { pathname } = useLocation();

  useEffect(() => {
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
        if (el.classList.contains("fade-text") || el.closest(SKIP)) return;
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
