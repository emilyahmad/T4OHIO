import { useState } from "react";
import "./Contact.css";

function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleSubmitAnother = () => {
        setSubmitted(false);
        setFormData({ fname: "", lname: "", email: "", message: "" });
    };

    return (
        <div className="contact-page">
            <div className="contact-card">
                <h2>Get in Touch</h2>

                {!submitted ? (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-name-row">
                            <div className="contact-field">
                                <label htmlFor="fname">First Name</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    required
                                    placeholder="e.g. Jane"
                                    value={formData.fname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="contact-field">
                                <label htmlFor="lname">Last Name</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    required
                                    placeholder="e.g. Doe"
                                    value={formData.lname}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="e.g. janedoe@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="contact-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                placeholder="What's on your mind?"
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="contact-submit-btn" type="submit">
                            Send Message
                        </button>
                    </form>
                ) : (
                    <div className="contact-success">
                        <div className="contact-success-icon">✓</div>
                        <h2>Message Sent!</h2>
                        <p>
                            Thank you for reaching out! We'll get back to you shortly at {formData.email}.
                        </p>
                        <button
                            className="contact-submit-another-btn"
                            onClick={handleSubmitAnother}>
                            Send Another Message
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Contact;