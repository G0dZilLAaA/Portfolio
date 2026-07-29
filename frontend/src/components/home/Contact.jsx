import { useState } from "react";
import portfolio from "../../data/portfolio";

export default function Contact() {
  const { personal } = portfolio;
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Thanks for your message! I'll respond soon.");
  }

  return (
    <section id="contact" className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">Let&apos;s Connect</h2>
        <div className="section-divider" />
        <p className="type-body">I&apos;m always interested in discussing software engineering, AI, backend development and exciting opportunities.</p>
      </div>

      <div className="contact-shell">
        <div className="contact-card fade-in-up">
          <h3>Contact Details</h3>
          <p className="type-body mt-3">Reach out for internships, collaborations, or technical conversations.</p>

          <div className="contact-list">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span>{personal.phone}</span>
          </div>
        </div>

        <div className="contact-card fade-in-up">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Your email" required />
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Tell me more" required />
            </div>
            <button type="submit" className="btn btn-primary type-button">Send Message</button>
            {status && <p className="type-meta mt-4 text-secondary">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
