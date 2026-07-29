import { useEffect, useState } from "react";

const navItems = [
  { title: "About", id: "about" },
  { title: "Skills", id: "skills" },
  { title: "Experience", id: "experience" },
  { title: "Projects", id: "projects" },
  { title: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["about", "skills", "experience", "projects", "contact"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const currentSection = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        return window.scrollY >= section.offsetTop - 140 && window.scrollY < section.offsetTop + section.offsetHeight - 140;
      });

      setActiveSection(currentSection || "home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar-shell ${scrolled ? "scrolled" : "transparent"}`}>
      <div className="navbar-inner">
        <button
          type="button"
          className="nav-brand"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          DeveloperHub
        </button>

        <div className="nav-links hidden md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle md:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="bg-surface-strong border-t border-white/10 md:hidden">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full border-b border-white/10 px-6 py-4 text-left text-primary"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
