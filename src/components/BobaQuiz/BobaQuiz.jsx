import { useState } from "react";
import QuizModal from "./QuizModal.jsx";
import "./BobaQuiz.css";

// A short banner on the home page; the button opens the quiz
function BobaQuiz() {
    const [open, setOpen] = useState(false);

    return (
        <section className="boba-quiz">
            <h1>What kind of boba are you?</h1>
            <p>Not sure what to order or waiting for your drink?</p>
            <button type="button" className="boba-quiz-button" onClick={() => setOpen(true)}>
                Take the quiz
            </button>
            {open && <QuizModal onClose={() => setOpen(false)} />}
        </section>
    );
}

export default BobaQuiz;
