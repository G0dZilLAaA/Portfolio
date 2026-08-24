import { useEffect, useState } from "react";
import { ExternalLink, Link, Mail } from "lucide-react";
import portfolio from "../../data/portfolio";
import profilePhoto from "../../assets/images/profile.jpg";

export default function Hero() {
  const { personal } = portfolio;
  const roles = [personal.role, ...personal.subtitle.split("|").map((item) => item.trim())];
  const [activeRole, setActiveRole] = useState(roles[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((current) => {
        const nextIndex = (roles.indexOf(current) + 1) % roles.length;
        return roles[nextIndex] || roles[0];
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [roles]);

  function scrollTo(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="hero-shell page-shell">
      <div className="section-block">
        <div className="section-inner hero-grid">
          <div className="hero-copy fade-in-up">
            <span className="hero-eyebrow">Design-driven full-stack engineering</span>
            <h1 className="type-display">{personal.name}</h1>
            <p className="type-heading">
              <span className="text-primary">{activeRole}</span> crafting polished React applications, reliable REST APIs,
              and secure authentication flows.
            </p>
            <p className="type-body">
              I combine modern UI, strong backend architecture, and clean workflows to deliver production-ready portfolio projects
              with real-world impact.
            </p>

            <div className="hero-actions">
              <button type="button" className="btn btn-primary type-button" onClick={() => scrollTo("projects")}>View Projects</button>
              <button type="button" className="btn btn-secondary type-button" onClick={() => scrollTo("contact")}>Contact Me</button>
            </div>

            <div className="hero-socials">
              <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn btn-secondary">
                <Link size={16} /> GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn btn-secondary">
                <ExternalLink size={16} /> LinkedIn
              </a>
              <a href={`mailto:${personal.email}`} className="btn btn-secondary" aria-label="Email">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>

          <div className="hero-visual slide-in">
            <div className="hero-badge">Portfolio Spotlight</div>
            <div className="hero-illustration">
              <img src={profilePhoto} alt={personal.name} />
            </div>
            <div className="hero-card">
              <span>Core focus</span>
              <h3>High-quality UI, scalable backend services, and polished deployment-ready software.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
