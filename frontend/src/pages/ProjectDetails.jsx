import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  ExternalLink,
  Monitor,
  Server,
  ShieldCheck,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { getProject, getProjects } from "../services/project.service";

function getTechGroups(technologies) {
  const groups = {
    frontend: [],
    backend: [],
    database: [],
    other: [],
  };

  technologies.forEach(({ technology }) => {
    const name = technology.name;
    const lower = name.toLowerCase();

    if (/react|tailwind|css|html|javascript|typescript|vite/.test(lower)) {
      groups.frontend.push(name);
      return;
    }

    if (/node|express|prisma|jwt|rest|api|server/.test(lower)) {
      groups.backend.push(name);
      return;
    }

    if (/postgre|mysql|sqlite|mongo|database|db/.test(lower)) {
      groups.database.push(name);
      return;
    }

    groups.other.push(name);
  });

  if (!groups.frontend.length && technologies.length) {
    groups.frontend = technologies.map(({ technology }) => technology.name);
  }

  return groups;
}

function getRelatedProjects(current, projects) {
  if (!current) return [];

  const currentTech = current.technologies.map((item) => item.technology.name.toLowerCase());

  return projects
    .filter((project) => project.slug !== current.slug)
    .map((project) => {
      const score = project.technologies.reduce((sum, techItem) => {
        return currentTech.includes(techItem.technology.name.toLowerCase()) ? sum + 1 : sum;
      }, 0);

      return { project, score };
    })
    .sort((a, b) => b.score - a.score || a.project.title.localeCompare(b.project.title))
    .slice(0, 3)
    .map((item) => item.project);
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProject() {
      setLoading(true);
      setError("");

      try {
        const [projectData, allProjects] = await Promise.all([getProject(slug), getProjects()]);
        if (!active) return;
        setProject(projectData);
        setProjects(allProjects);
      } catch (err) {
        if (!active) return;
        setError("Unable to load project details.");
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    if (slug) {
      loadProject();
    }

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="section-block text-center type-body">
        Loading project details...
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="section-block text-center type-body">
        <p>{error || "Project not found."}</p>
        <RouterLink to="/" className="btn btn-secondary type-button mt-6 inline-flex">
          Back to Portfolio
        </RouterLink>
      </section>
    );
  }

  const techGroups = getTechGroups(project.technologies);
  const relatedProjects = getRelatedProjects(project, projects);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const previousProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const nextProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const screenshotImages = project.thumbnail ? [project.thumbnail] : [];

  const featureCards = [
    {
      title: "Polished user experience",
      description: "A responsive project presentation with a premium layout, tactile interactions, and fast navigation.",
      Icon: Monitor,
    },
    {
      title: "API driven architecture",
      description: "Express, Prisma and PostgreSQL power the backend while JWT-friendly flows keep data stable.",
      Icon: Server,
    },
    {
      title: "Secure data delivery",
      description: "A modern delivery pipeline designed for production-ready web experiences and strong application structure.",
      Icon: ShieldCheck,
    },
  ];

  const challengePoints = [
    "Balancing a clean visual system with adaptable content sections.",
    "Keeping routing simple while maintaining a modern case-study flow.",
    "Presenting backend and frontend details in a single coherent narrative.",
    "Delivering quality visuals while using a centralized theme and component design system.",
  ];

  const lessons = [
    "Design systems unlock consistency across page layouts and reusable components.",
    "Strong project pages should communicate both technical detail and user benefit.",
    "A pragmatic detail page can provide clarity without relying on extra backend schema changes.",
  ];

  const improvements = [
    "Add dedicated schema fields for screenshots, architecture diagrams, and feature highlights.",
    "Include case study metrics such as performance, user engagement, and deployment data.",
    "Expand related project discovery with shared technology, domain, and business value.",
  ];

  return (
    <section className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">Project Case Study</h2>
        <div className="section-divider" />
        <p className="type-body">A polished project detail experience built with the same design system used across the portfolio.</p>
      </div>

      <div className="project-hero-grid fade-in-up">
        <div className="card-panel p-10">
          <div className="project-title-bar">
            <div>
              <p className="type-meta">Project</p>
              <h1 className="type-card-title mt-3">{project.title}</h1>
            </div>
            <div className="project-tag-pill">Case Study</div>
          </div>

          <p className="type-body mt-6">{project.description}</p>

          <div className="project-hero-tools">
            {project.technologies.map((item) => (
              <span key={item.technology.id} className="badge-pill">{item.technology.name}</span>
            ))}
          </div>

          <div className="project-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary type-button">
                <Code size={16} /> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary type-button">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="project-hero-banner card-panel overflow-hidden">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={`${project.title} thumbnail`} />
          ) : (
            <div className="project-placeholder">
              <p>No project thumbnail available</p>
            </div>
          )}
        </div>
      </div>

      <div className="project-section-bezel">
        <section className="card-panel p-10">
          <h3 className="type-card-title">Project Overview</h3>
          <p className="type-body mt-4">{project.description}</p>
        </section>

        <section className="card-panel p-10">
          <h3 className="type-card-title">Problem Statement</h3>
          <p className="type-body mt-4">{project.shortDescription}</p>
          <p className="type-body mt-4">
            This case study focuses on delivering a cohesive front-end experience backed by a stable API layer, helping users interact with the application quickly and reliably.
          </p>
        </section>
      </div>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Features</h2>
          <div className="section-divider" />
        </div>

        <div className="project-feature-grid">
          {featureCards.map(({ title, description, Icon }) => (
            <div key={title} className="project-feature-card">
              <div className="type-meta flex items-center gap-2">
                <Icon size={18} /> {title}
              </div>
              <p className="type-body mt-4">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Technology Stack</h2>
          <div className="section-divider" />
        </div>

        <div className="project-tech-grid">
          {Object.entries(techGroups).map(([group, items]) =>
            items.length > 0 ? (
              <div key={group} className="project-stack-card">
                <p className="type-meta text-secondary uppercase tracking-[0.16em]">{group}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((name) => (
                    <span key={name} className="tag-pill">{name}</span>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Architecture</h2>
          <div className="section-divider" />
        </div>

        <div className="card-panel p-10">
          <p className="type-body">The architecture ties the React presentation layer to the backend API, enabling a clean separation between UI and data logic.</p>
          <div className="project-screenshot mt-6">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt="Architecture diagram" />
            ) : (
              <div className="project-placeholder">
                <p>Architecture diagram placeholder</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Screenshots Gallery</h2>
          <div className="section-divider" />
        </div>

        <div className="project-gallery">
          {screenshotImages.length > 0 ? (
            screenshotImages.map((src, index) => (
              <div key={index} className="project-screenshot">
                <img src={src} alt={`${project.title} screenshot ${index + 1}`} />
              </div>
            ))
          ) : (
            <div className="project-placeholder">
              <p>No screenshots available.</p>
            </div>
          )}
        </div>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Challenges</h2>
          <div className="section-divider" />
        </div>

        <ul className="type-body space-y-3">
          {challengePoints.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-primary">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Lessons Learned</h2>
          <div className="section-divider" />
        </div>

        <div className="project-feature-grid">
          {lessons.map((item) => (
            <div key={item} className="project-feature-card">
              <div className="type-meta flex items-center gap-2">
                <Lightbulb size={18} /> Lesson
              </div>
              <p className="type-body mt-4">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Future Improvements</h2>
          <div className="section-divider" />
        </div>

        <div className="project-feature-grid">
          {improvements.map((item) => (
            <div key={item} className="project-feature-card">
              <div className="type-meta flex items-center gap-2">
                <ListChecks size={18} /> Roadmap
              </div>
              <p className="type-body mt-4">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="project-nav-panel">
        <button type="button" className="project-nav-button secondary" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Projects
        </button>

        <div className="flex flex-wrap gap-3">
          {previousProject && (
            <RouterLink to={`/projects/${previousProject.slug}`} className="project-nav-button secondary">
              <ArrowLeft size={16} /> Previous
            </RouterLink>
          )}
          {nextProject && (
            <RouterLink to={`/projects/${nextProject.slug}`} className="project-nav-button secondary">
              Next <ArrowRight size={16} />
            </RouterLink>
          )}
        </div>
      </div>

      <section className="project-section-bezel">
        <div className="section-heading fade-in-up">
          <h2 className="type-heading">Related Projects</h2>
          <div className="section-divider" />
        </div>

        <div className="project-related-grid">
          {relatedProjects.length > 0 ? (
            relatedProjects.map((item) => (
              <RouterLink key={item.slug} to={`/projects/${item.slug}`} className="project-related-card hover-float">
                <p className="type-card-title">{item.title}</p>
                <p className="type-body mt-4">{item.shortDescription}</p>
                <div className="project-links mt-6">
                  <span className="badge-pill">View case study</span>
                </div>
              </RouterLink>
            ))
          ) : (
            <div className="project-placeholder">
              <p>No related projects available.</p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
