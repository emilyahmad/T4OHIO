import { useEffect, useState } from "react";
import { GOOGLE_REVIEWS_URL, reviewPhotos } from "../../data/siteContent.js";
import { asset } from "../../utils/asset.js";
import "./Reviews.css";

// Only used while developing locally, so the carousel can be seen before real reviews are added.
// The import.meta.env.DEV check is replaced with `false` in production builds, so these are left out entirely.
const SAMPLE_REVIEWS = !import.meta.env.DEV ? [] : Array.from({ length: 8 }, (_, i) => ({
    id: `sample-${i}`,
    name: `Sample reviewer ${i + 1}`,
    rating: 5 - (i % 3 === 2 ? 1 : 0),
    location: "Centerville, OH",
    date: "Jun 30, 2026",
    photos: [["img/philo-video.png", "img/video.png"], ["img/video.png"], []][i % 3], // some rotate, some have one photo, some none
    text: [
        "Sample review text. Real customer reviews added in Admin → Front Page show here instead.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    ][i % 3],
    visible: true,
}));

// The reviews fill the section's background in this many rows, scrolling in opposite directions
const ROWS = 3;
// Each row repeats its reviews so the loop is seamless; make sure one copy is at least this long
const MIN_CARDS_PER_LOOP = 10;
// Seconds each card takes to scroll past; more cards means a longer loop at the same speed
const SECONDS_PER_CARD = 16;
// A review without photos and with no more than this many characters is "short":
// two short ones share a column, stacked, so together they're as tall as a regular card
const SHORT_REVIEW_CHARS = 120;
// How long each photo shows on a card with several
const PHOTO_SECONDS = 3.5;

const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// What they ordered, across the top of the card. Several photos fade from one to the next on their own
// (not for people who've asked their device to reduce motion; they see the first photo).
function ReviewPhotos({ photos, offset }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (photos.length < 2 || prefersReducedMotion()) return;
        let timer;
        // Cards start at different moments so they don't all change photo together
        const start = setTimeout(() => {
            setCurrent((i) => (i + 1) % photos.length);
            timer = setInterval(() => setCurrent((i) => (i + 1) % photos.length), PHOTO_SECONDS * 1000);
        }, (PHOTO_SECONDS + (offset % 4) * 0.6) * 1000);
        return () => { clearTimeout(start); clearInterval(timer); };
    }, [photos.length, offset]);

    return (
        <div className="review-photo">
            {photos.map((photo, i) => (
                <img key={photo} src={asset(photo)} alt="" loading="lazy" className={i === current ? "is-current" : undefined}/>
            ))}
            {photos.length > 1 && (
                <div className="review-photo-dots" aria-hidden="true">
                    {photos.map((photo, i) => <span key={photo} className={i === current ? "is-current" : undefined}/>)}
                </div>
            )}
        </div>
    );
}

function Stars({ rating }) {
    if (!rating) return null;
    return (
        <div className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={n <= rating ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden="true"/>
            ))}
        </div>
    );
}

function ReviewCard({ review, index }) {
    const details = [review.location, review.date].map((part) => part?.trim()).filter(Boolean).join(" · ");
    const photos = reviewPhotos(review);
    return (
        <figure className={photos.length ? "review-card has-photo" : "review-card"}>
            {photos.length > 0 && <ReviewPhotos photos={photos} offset={index}/>}
            <Stars rating={review.rating}/>
            <blockquote>“{review.text.trim()}”</blockquote>
            {/* Who wrote it, then where they're from and when */}
            <figcaption>
                {review.name.trim() && <span className="review-name">{review.name.trim()}</span>}
                {details && <span className="review-details">{details}</span>}
            </figcaption>
        </figure>
    );
}

const isShort = (review) => reviewPhotos(review).length === 0 && review.text.trim().length <= SHORT_REVIEW_CHARS;

// Groups reviews into carousel columns: one review each, except short ones, which pair up.
// A short review is paired with the next short one in the list (pulled forward if needed); a lone short one stands alone.
function toColumns(reviews) {
    const rest = [...reviews];
    const columns = [];
    while (rest.length) {
        const review = rest.shift();
        const partner = isShort(review) ? rest.findIndex(isShort) : -1;
        columns.push(partner === -1 ? [review] : [review, ...rest.splice(partner, 1)]);
    }
    return columns;
}

// One row of the background: its columns repeated until long enough, in two identical halves.
// The track slides by exactly one half, then starts over.
function ReviewRow({ columns, reverse }) {
    const loop = [];
    while (columns.length && loop.length < MIN_CARDS_PER_LOOP) loop.push(...columns);

    return (
        <div className="reviews-carousel">
            <div className={reverse ? "reviews-track is-reverse" : "reviews-track"}
                style={{ "--loop-duration": `${loop.length * SECONDS_PER_CARD}s` }}>
                {[0, 1].map((copy) => (
                    <div className="reviews-loop" key={copy} aria-hidden={copy === 1 || undefined}>
                        {loop.map((column, i) => column.length === 1
                            ? <ReviewCard key={`${column[0].id}-${i}`} review={column[0]} index={i}/>
                            : (
                                <div className="review-stack" key={`${column[0].id}-${i}`}>
                                    {column.map((review) => <ReviewCard key={review.id} review={review} index={i}/>)}
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

// The owner adds real reviews from Admin → Front Page (see data/siteContent.js).
// Faded review cards scroll past behind the section's heading and Google button; hovering one pauses its row.
function Reviews({ title, reviews }) {
    let shown = reviews.filter((review) => review.visible && review.text.trim());
    const usingSamples = shown.length === 0 && import.meta.env.DEV;
    if (usingSamples) shown = SAMPLE_REVIEWS;

    // Columns are dealt out to the rows in turn, so each row keeps the newest-first order
    const columns = toColumns(shown);
    const rows = Array.from({ length: Math.min(ROWS, columns.length) }, (_, r) => columns.filter((_, i) => i % ROWS === r));

    return (
        <section className={rows.length ? "reviews" : "reviews is-empty"}>
            {rows.length > 0 && (
                <div className="reviews-backdrop">
                    {rows.map((row, r) => <ReviewRow key={r} columns={row} reverse={r % 2 === 1}/>)}
                </div>
            )}

            <div className="reviews-overlay">
                <h1>{title}</h1>
                <p className="reviews-subheading">See what our customers are saying</p>
                {usingSamples && <p className="reviews-sample-note">Sample cards, only shown while developing locally.</p>}
                <a className="reviews-google" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-google" aria-hidden="true"/> Read &amp; leave reviews on Google
                </a>
            </div>
        </section>
    );
}

export default Reviews;
