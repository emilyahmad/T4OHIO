import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { asset } from "../../utils/asset.js";
import "./Promotions.css";

// Used until an image has loaded (and for empty slots in the admin preview)
const DEFAULT_RATIO = 4 / 3;

// Reads each image's width ÷ height once it loads, so the layout can fit every image without cropping
function useImageRatios(srcs) {
  const [ratios, setRatios] = useState({});
  const key = srcs.join("|");

  useEffect(() => {
    let cancelled = false;
    srcs.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled && img.naturalWidth) {
          setRatios((r) => ({ ...r, [src]: img.naturalWidth / img.naturalHeight }));
        }
      };
      img.src = src;
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` stands in for the srcs array
  }, [key]);

  return srcs.map((src) => ratios[src] || DEFAULT_RATIO);
}

// Lays images side by side at one shared height, filling `width` exactly
function justifiedRow(ratios, width, gap, top) {
  const height = (width - gap * (ratios.length - 1)) / ratios.reduce((a, b) => a + b, 0);
  let left = 0;
  const rects = ratios.map((r) => {
    const rect = { left, top, width: r * height, height };
    left += r * height + gap;
    return rect;
  });
  return { rects, height };
}

// Every way to split the images, in order, into rows (e.g. 3 images → 3 | 2+1 | 1+2 | 1+1+1)
function rowSplits(n) {
  if (n === 0) return [[]];
  const splits = [];
  for (let first = 1; first <= n; first++) {
    for (const rest of rowSplits(n - first)) splits.push([first, ...rest]);
  }
  return splits;
}

// The candidate layouts for these images. Each returns rects (in image order) and the total height.
function candidateLayouts(ratios, width, gap) {
  const layouts = rowSplits(ratios.length).map((split) => {
    const rects = [];
    let top = 0;
    let index = 0;
    for (const count of split) {
      const row = justifiedRow(ratios.slice(index, index + count), width, gap, top);
      rects.push(...row.rects);
      top += row.height + gap;
      index += count;
    }
    return { rects, height: top - gap };
  });

  // Featured layout for 3 images: the 1st large on the right, the 2nd and 3rd stacked on the left,
  // sized so both columns end up exactly the same height
  if (ratios.length === 3) {
    const [big, a, b] = ratios;
    const stack = 1 / a + 1 / b;
    const leftWidth = (width - gap - big * gap) / (1 + big * stack);
    const height = leftWidth * stack + gap;
    const rightWidth = big * height;
    if (leftWidth > 0) {
      layouts.push({
        height,
        rects: [
          { left: leftWidth + gap, top: 0, width: rightWidth, height },
          { left: 0, top: 0, width: leftWidth, height: leftWidth / a },
          { left: 0, top: leftWidth / a + gap, width: leftWidth, height: leftWidth / b },
        ],
      });
    }
  }

  return layouts;
}

// Picks the layout whose height is closest to a comfortable target for this width,
// then shrinks it (centered) if it's still too tall. Nothing is ever cropped.
function chooseLayout(ratios, width) {
  const phone = width < 600;
  const gap = phone ? 12 : 24;
  const target = width * (phone ? 1.6 : 0.45);
  const maxHeight = target * 1.5;

  let best = null;
  for (const layout of candidateLayouts(ratios, width, gap)) {
    const score = Math.abs(Math.log(layout.height / target));
    if (!best || score < best.score) best = { ...layout, score };
  }

  if (best.height <= maxHeight) return best;
  const scale = maxHeight / best.height;
  const offset = (width - width * scale) / 2;
  return {
    height: maxHeight,
    rects: best.rects.map((r) => ({
      left: r.left * scale + offset,
      top: r.top * scale,
      width: r.width * scale,
      height: r.height * scale,
    })),
  };
}

// The image arrangement on its own, so the admin preview can use the same layout as the site.
// `images` is [{ id, image, alt }]; an empty `image` shows a "No image" box.
export function PromotionsGrid({ images }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const srcs = images.map((promo) => (promo.image ? asset(promo.image) : null));
  const ratios = useImageRatios(srcs);

  useLayoutEffect(() => {
    const el = ref.current;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const layout = width ? chooseLayout(ratios, width) : { rects: [], height: 0 };

  return (
    <div className="promotions-grid" ref={ref} style={{ height: layout.height }}>
      {layout.rects.map((rect, i) => {
        const promo = images[i];
        return srcs[i]
          ? <img key={promo.id} src={srcs[i]} alt={promo.alt} style={rect}/>
          : <div key={promo.id} className="promo-missing" style={rect}>No image</div>;
      })}
    </div>
  );
}

// The owner edits these from Admin → Front Page (see data/siteContent.js).
function Promotions({ title, images }) {
  if (!images.length) return null;

  return (
    <section className="promotions">
      <h1>{title}</h1>
      <PromotionsGrid images={images}/>
    </section>
  );
}

export default Promotions;
