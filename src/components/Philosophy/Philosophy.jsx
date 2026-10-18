import { asset } from "../../utils/asset.js";
import HeroVideo from "../Hero/HeroVideo.jsx";
import "./Philosophy.css";

// Image blocks under the video, one per step of the tea making process (content from public/PHILOSOPHY.md).
// Their headings alternate between the bottom-left and bottom-right corner.
const FEATURES = [
  {
    image: "https://images.unsplash.com/photo-1455157823797-3019317cbcf0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Rows of tea bushes covering misty green hillsides",
    heading: "Picking and Sun Withering",
    subheading: "Step 1",
    text: "The master accurately controls the temperature and humidity and picks in the morning, when there is no dew. After picking, the tea leaves are sent to the sun-withering field immediately. Sunlight plays a decisive role in this stage, as natural sunlight can reduce the moisture content of the tea by 8-15%. The master flips the leaves from time to time to ensure that each piece of tea is adequately cared for.",
  },
  {
    image: "https://burst.shopifycdn.com/photos/gold-spoons-in-a-row-filled-with-loose-leaf-tea.jpg?width=1850&format=pjpg&exif=0&iptc=0",
    alt: "Gold spoons in a row, each filled with loose leaf tea",
    heading: "Indoor Withering",
    subheading: "Step 2",
    text: "In a constant temperature and humidity indoor environment, the tea is allowed to ferment steadily. It is constantly stirred to promote the action of enzymes and polyphenols, remove the bitterness and raw taste, and control the degree of fermentation. The tea is then left to rest for another 8-10 hours. This gives it a special aroma and taste.",
    credit: { name: "Avelino Calvar Martinez", url: "https://www.shopify.com/stock-photos/@ave", source: "Burst", sourceUrl: "https://www.shopify.com/stock-photos/gold" },
  },
  {
    image: "https://images.unsplash.com/photo-1620747044266-23c91eecca3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "A pile of fresh green tea leaves in front of steel processing machines",
    heading: "Frying and Rolling",
    subheading: "Step 3",
    text: "The tea is placed in a frying furnace at 300-350℃ and stir-fried for 6-8 minutes, which begins the initial rolling and drying and fixes the flavor. The master's frying usually takes a whole night to finish. Each tea leaf must then be rolled 32 times on average to form the unique ball shape of Taiwanese tea. This also allows the tea to ferment again, making the fragrance and aftertaste stronger.",
  },
  {
    image: "https://images.unsplash.com/photo-1437315306147-0923bdb3fc12?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    alt: "Woven baskets of tea leaves laid out to dry, with a small child reaching into one",
    heading: "Baking and Drying",
    subheading: "Step 4",
    text: "The tea is dried at 110-120℃ to remove its off-flavor. The high temperature also stops the enzyme activity that continued after frying. As a result, the fermentation of the tea stops. After drying, the tea ends up with a special roasted aroma.",
  },
];

function Philosophy() {
  return (
    <section className="philosophy-section">
      <h1>Philosophy</h1>
      {/* Same player as the home page: muted, looping, with YouTube's controls and logo hidden */}
      <div className="tea-video">
        <HeroVideo video="fsqg5liM0bs" title="A video of the tea making process, beginning with harvesting the leaves to serving the customer"/>
      </div>
      <p className="tea-video-caption">
        A journey through Taiwan with T4. It starts in the tea fields of Nantou, where our leaves are picked in the
        early morning, then follows our tea masters as they sun-wither, ferment, roast, hand-roll and dry each
        batch, all the way to the fresh cup we serve you.
      </p>

      <hr className="philosophy-divider"/>

      {FEATURES.map((feature, index) => (
        <article key={index} className={index % 2 ? "philosophy-feature-block align-right" : "philosophy-feature-block"}>
          <figure className="philosophy-feature">
            <img src={asset(feature.image)} alt={feature.alt}/>
            <figcaption>
              <h2>{feature.heading}</h2>
              <h3>{feature.subheading}</h3>
            </figcaption>
          </figure>
          <p className="philosophy-feature-text">
            {feature.text}
            {feature.credit && (
              <small className="philosophy-photo-credit">
                Photo by <a href={feature.credit.url} target="_blank" rel="noreferrer">{feature.credit.name}</a> from{" "}
                <a href={feature.credit.sourceUrl} target="_blank" rel="noreferrer">{feature.credit.source}</a>
              </small>
            )}
          </p>
        </article>
      ))}
    </section>
  );
}

export default Philosophy;
