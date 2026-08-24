import { useEffect, useState } from "react";
import { getProjects } from "../../services/project.service";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">Featured Projects</h2>
        <div className="section-divider" />
        <p className="type-body">Recent projects that demonstrate full-stack delivery, API integration, and polished UI design.</p>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card-panel animate-pulse p-8">
              <div className="mb-6 h-40 w-full rounded-3xl bg-slate-800/60" />
              <div className="mb-3 h-6 w-3/4 rounded bg-slate-800/60" />
              <div className="h-4 w-full rounded bg-slate-800/60" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="type-body text-primary text-center">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.length === 0 ? (
            <div className="card-panel p-10 text-center type-body">No projects found. Please check back later.</div>
          ) : (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          )}
        </div>
      )}
    </section>
  );
}
