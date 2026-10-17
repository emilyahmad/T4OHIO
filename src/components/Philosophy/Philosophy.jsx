import HeroVideo from "../Hero/HeroVideo.jsx";
import "./Philosophy.css";

function Philosophy() {
  return (
    <section className="philosophy-section">
      <h1>Philosophy</h1>
      {/* Same player as the home page: muted, looping, with YouTube's controls and logo hidden */}
      <div className="tea-video">
        <HeroVideo video="fsqg5liM0bs" title="A video of the tea making process, beginning with harvesting the leaves to serving the customer"/>
      </div>
    </section>
  );
}

export default Philosophy;
