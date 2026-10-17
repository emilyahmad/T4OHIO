import { GOOGLE_REVIEWS_URL } from "../../data/siteContent.js";
import { asset } from "../../utils/asset.js";
import "./Reviews.css";

// Only used while developing locally, so the carousel can be seen before real reviews are added.
// The import.meta.env.DEV check is replaced with `false` in production builds, so these are left out entirely.
const SAMPLE_REVIEWS = !import.meta.env.DEV ? [] : Array.from({ length: 8 }, (_, i) => ({
    id: `sample-${i}`,
    name: `Sample reviewer ${i + 1}`,
    rating: 5 - (i % 3 === 2 ? 1 : 0),
    image: i % 2 === 0 ? "img/video.png" : null, // half with a reviewer photo, half showing the initial
    photo: ["img/philo-video.png", "img/video.png", null][i % 3], // two in three with a food/drink photo
    text: [
        "Sample review text. Real customer reviews added in Admin → Front Page show here instead.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    ][i % 3],
    visible: true,
}));

// The track repeats the reviews so the loop is seamless; make sure one copy is at least this long
const MIN_CARDS_PER_LOOP = 8;
// Seconds each card takes to scroll past; more cards means a longer loop at the same speed
const SECONDS_PER_CARD = 6;

function Stars({ rating }) {
    return (
        <div className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={n <= rating ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden="true"/>
            ))}
        </div>
    );
}

// A small round photo, or the reviewer's initial when there isn't one
function ReviewAvatar({ review }) {
    if (review.image) return <img className="review-avatar" src={asset(review.image)} alt="" loading="lazy"/>;
    const initial = review.name.trim().charAt(0).toUpperCase() || "★";
    return <span className="review-avatar is-initial" aria-hidden="true">{initial}</span>;
}

function ReviewCard({ review }) {
    return (
        <figure className={review.photo ? "review-card has-photo" : "review-card"}>
            {/* What they ordered, across the top of the card */}
            {review.photo && <img className="review-photo" src={asset(review.photo)} alt="" loading="lazy"/>}
            <Stars rating={review.rating}/>
            <blockquote>“{review.text.trim()}”</blockquote>
            <figcaption>
                <ReviewAvatar review={review}/>
                {review.name.trim() && <span>{review.name.trim()}</span>}
            </figcaption>
        </figure>
    );
}

// The owner adds real reviews from Admin → Front Page (see data/siteContent.js).
// They scroll past on their own in a loop; hovering (or pressing and holding) pauses them.
function Reviews({ title, reviews }) {
    let shown = reviews.filter((review) => review.visible && review.text.trim());
    const usingSamples = shown.length === 0 && import.meta.env.DEV;
    if (usingSamples) shown = SAMPLE_REVIEWS;

    // One loop: the reviews repeated until there are enough to fill wide screens
    const loop = [];
    while (shown.length && loop.length < MIN_CARDS_PER_LOOP) loop.push(...shown);

    return (
        <section className="reviews">
            <h1>{title}</h1>
            <p className="reviews-subheading">See what our customers are saying, and tell us about your visit.</p>
            {usingSamples && <p className="reviews-sample-note">Sample cards, only shown while developing locally.</p>}

            {shown.length > 0 && (
                <div className="reviews-carousel">
                    {/* Two identical halves: the track slides left by exactly one half, then starts over */}
                    <div className="reviews-track" style={{ "--loop-duration": `${loop.length * SECONDS_PER_CARD}s` }}>
                        {[0, 1].map((copy) => (
                            <div className="reviews-loop" key={copy} aria-hidden={copy === 1 || undefined}>
                                {loop.map((review, i) => <ReviewCard key={`${review.id}-${i}`} review={review}/>)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <a className="reviews-google" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-google" aria-hidden="true"/> Read &amp; leave reviews on Google
            </a>
        </section>
    );
}

export default Reviews;
