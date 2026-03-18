import "./Hero.css";


function Hero() {
    return (
        <section className="hero">
            <iframe id="video" width="560" height="315" src="https://www.youtube.com/embed/on6hNkJiKBw?si=gArAUtAMrDC86qpB&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            {/* <img id="video" src="img/video.png"></img> */}
            <img id="logo" src="img/logo.png"></img>
            <h1 id="title">T4</h1>
        </section>
        // add pause & resume button for background video
        // exchange photo with video (high quality)
    );
}

export default Hero;