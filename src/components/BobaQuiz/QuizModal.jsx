import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { QUESTIONS, RESULTS, pickResult } from "./bobaQuizData.js";
import { itemImage } from "../../data/menu.js";
import { useMenu } from "../../data/useMenu.js";
import { track } from "../../lib/analytics.js";
import "./BobaQuiz.css";

// Answers so far, kept for the rest of the browser session so closing the quiz doesn't lose them.
// Stored as the index of the chosen option for each question; "Take it again" clears them.
const SAVE_KEY = "boba-quiz-answers";

function loadAnswers() {
    try {
        const saved = JSON.parse(sessionStorage.getItem(SAVE_KEY));
        if (!Array.isArray(saved) || saved.length > QUESTIONS.length) return [];
        const answers = saved.map((choice, step) => QUESTIONS[step].options[choice]);
        return answers.every(Boolean) ? answers : [];
    } catch {
        return [];
    }
}

// The "What kind of boba are you?" quiz, in a dialog.
// The result links to the Order Now page, searching for the matched drink; pass `onPick` to handle that
// yourself instead (the Order Now page does, since it's already there).
function QuizModal({ onClose, onPick }) {
    const [answers, setAnswers] = useState(loadAnswers);
    useEffect(() => {
        try {
            sessionStorage.setItem(SAVE_KEY, JSON.stringify(answers.map((answer, step) => QUESTIONS[step].options.indexOf(answer))));
        } catch { /* not saved; the quiz still works */ }
    }, [answers]);
    const closeRef = useRef(null);
    // Kept in a ref so the effect below runs once on open, not on every re-render
    const onCloseRef = useRef(onClose);
    useEffect(() => { onCloseRef.current = onClose; });
    const { menu } = useMenu();

    // Escape closes; the page behind stops scrolling; focus starts inside the dialog
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onCloseRef.current(); };
        window.addEventListener("keydown", onKey);
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = overflow;
        };
    }, []);

    const step = answers.length;
    const finished = step === QUESTIONS.length;
    const question = QUESTIONS[step];

    const result = finished ? RESULTS[pickResult(answers)] : null;
    // The matched drink's photo and price, once the menu has loaded. The menu may add a suffix to the name,
    // e.g. "Honey Peach Royal Tea (G)", so the name only has to start with the result's.
    const drink = result && menu.flatMap(category => category.items)
        .find(item => item.name.toLowerCase().startsWith(result.drink.toLowerCase()));
    const orderPath = result && `/order-now?q=${encodeURIComponent(result.drink)}`;

    return (
        <div className="quiz-backdrop" onClick={onClose}>
            <div className="quiz-modal" role="dialog" aria-modal="true" aria-labelledby="quiz-title"
                onClick={(e) => e.stopPropagation()}>

                <button ref={closeRef} className="quiz-close" onClick={onClose} aria-label="Close">
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>

                {!finished ? (
                    <div className="quiz-step" key={step}>
                        <div className="quiz-progress" role="progressbar" aria-label="Quiz progress"
                            aria-valuemin={1} aria-valuemax={QUESTIONS.length} aria-valuenow={step + 1}>
                            <span style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                        </div>
                        <h2 id="quiz-title">{question.question}</h2>
                        <div className="quiz-options">
                            {question.options.map((option) => (
                                <button type="button" className="quiz-option" key={option.label}
                                    onClick={() => {
                                        const next = [...answers, option];
                                        if (next.length === QUESTIONS.length) track("quiz", { result: RESULTS[pickResult(next)].drink });
                                        setAnswers(next);
                                    }}>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {/* Always takes up its space, so the answers sit in the same place on every question */}
                        <div className="quiz-footer">
                            {step > 0 && (
                                <button type="button" className="quiz-link" onClick={() => setAnswers(answers.slice(0, -1))}>
                                    <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="quiz-step quiz-result">
                        <p className="quiz-count">What drink are you?</p>
                        <div className="quiz-drink">
                            {drink && <img src={itemImage(drink)} alt="" className={drink.image ? undefined : "is-logo"} />}
                            <div>
                                <h2 id="quiz-title">{result.drink}</h2>
                                {drink && <span className="quiz-drink-price">${drink.price.toFixed(2)}</span>}
                            </div>
                        </div>
                        <p className="quiz-blurb">{result.blurb}</p>
                        <p className="quiz-tip">{result.tip}</p>

                        {onPick ? (
                            <button type="button" className="quiz-primary" onClick={() => onPick(result.drink)}>
                                Find it on the menu
                            </button>
                        ) : (
                            <Link className="quiz-primary" to={orderPath} onClick={onClose}>Find it on the menu</Link>
                        )}
                        <button type="button" className="quiz-link" onClick={() => setAnswers([])}>
                            <i className="fa-solid fa-rotate-left" aria-hidden="true" /> Take it again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizModal;
