import { asset } from "../../utils/asset.js";
import HeroVideo from "../Hero/HeroVideo.jsx";
import "./Philosophy.css";

const PLACEHOLDER_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.";

// Image blocks under the video. Their headings alternate between the bottom-left and bottom-right corner.
// Placeholders: replace each image, its description (alt), both headings and the text with the real content.
const FEATURES = [
  { image: "img/philo-video.png", alt: "Several T4 drinks with teal lids on a wooden tray", heading: "Medium Heading", subheading: "Smaller heading goes here", text: PLACEHOLDER_TEXT },
  { image: "img/video.png", alt: "A T4 team member holding out a milk tea with boba", heading: "Medium Heading", subheading: "Smaller heading goes here", text: PLACEHOLDER_TEXT },
  { image: "img/tea-video-img.png", alt: "An aerial view of Taipei, Taiwan", heading: "Medium Heading", subheading: "Smaller heading goes here", text: PLACEHOLDER_TEXT },
  { image: "img/menu-video-img.png", alt: "T4 drinks on a wooden tray", heading: "Medium Heading", subheading: "Smaller heading goes here", text: PLACEHOLDER_TEXT },
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
          <p className="philosophy-feature-text">{feature.text}</p>
        </article>
      ))}
    </section>
  );
}

export default Philosophy;
