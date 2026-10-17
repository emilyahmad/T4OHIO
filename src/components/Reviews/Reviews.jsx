import { GOOGLE_REVIEWS_URL } from "../../data/siteContent.js";
import "./Reviews.css";

function Stars({ rating }) {
    return (
        <div className="review-stars" role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={n <= rating ? "fa-solid fa-star" : "fa-regular fa-star"} aria-hidden="true"/>
            ))}
        </div>
    );
}

// The owner adds real reviews from Admin → Front Page (see data/siteContent.js).
// With none added yet, the section still points people to the Google reviews.
function Reviews({ title, reviews }) {
    const shown = reviews.filter((review) => review.visible && review.text.trim());

    return (
        <section className="reviews">
            <h1>{title}</h1>
            {shown.length > 0 ? (
                <div className="reviews-grid">
                    {shown.map((review) => (
                        <figure className="review-card" key={review.id}>
                            <Stars rating={review.rating}/>
                            <blockquote>“{review.text.trim()}”</blockquote>
                            {review.name.trim() && <figcaption>{review.name.trim()}</figcaption>}
                        </figure>
                    ))}
                </div>
            ) : (
                <p className="reviews-empty">See what our customers are saying, and tell us about your visit.</p>
            )}
            <a className="reviews-google" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-google" aria-hidden="true"/> Read &amp; leave reviews on Google
            </a>
        </section>
    );
}

export default Reviews;
