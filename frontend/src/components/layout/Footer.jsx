import portfolio from "../../data/portfolio";
import { ExternalLink, Link, Mail } from "lucide-react";

export default function Footer() {
  const { personal } = portfolio;

  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div>
          <p className="type-card-title">Mohit Kumawat</p>
          <p className="type-meta">Full Stack Developer focused on modern web applications.</p>
        </div>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Link size={16} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <ExternalLink size={16} />
          </a>
          <a href={`mailto:${personal.email}`} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>
      <div className="type-meta text-center mt-6 text-muted-soft">
        © {new Date().getFullYear()} Mohit Kumawat. Built with a refined design system and responsive UI.
      </div>
    </footer>
  );
}
