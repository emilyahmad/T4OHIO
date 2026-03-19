import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="video-container">
                <iframe
                    id="video"
                    src="https://www.youtube.com/embed/on6hNkJiKBw?controls=0&autoplay=1&mute=1&loop=1&playlist=on6hNkJiKBw&playsinline=1"
                    title="Background video"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen>
                </iframe>
            </div>
            <img id="logo" src="img/logo.png" alt="T4 logo" />
            <h1 id="title">T4</h1>
        </section>
        // add pause & resume button for background video
        // exchange photo with video (high quality)
    );
}

export default Hero;