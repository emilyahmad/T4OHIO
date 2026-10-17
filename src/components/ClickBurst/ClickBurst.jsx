import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ClickBurst.css";

// Angles (degrees from straight up) of the three little lines that pop out above each click
const LINES = [-40, 0, 40];

// Renders nothing; on every click anywhere on the page it pops three short lines out from the
// click point, like a little "!" reaction, then removes them
function ClickBurst() {
  const { pathname } = useLocation();
  const enabled = !pathname.startsWith("/admin");

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = (e) => {
      const burst = document.createElement("div");
      burst.className = "click-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      for (const angle of LINES) {
        const line = document.createElement("span");
        line.style.setProperty("--angle", `${angle}deg`);
        burst.appendChild(line);
      }
      burst.addEventListener("animationend", () => burst.remove(), { once: true });
      document.body.appendChild(burst);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [enabled]);

  return null;
}

export default ClickBurst;
