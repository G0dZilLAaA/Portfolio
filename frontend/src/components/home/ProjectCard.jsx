export default function ProjectCard({ project }) {
  return (
    <article className="card-panel overflow-hidden hover-float">
      <div className="h-56 overflow-hidden rounded-[1.5rem] bg-slate-800">
        <img
          src="https://placehold.co/600x350/1e293b/ffffff?text=Project+Preview"
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="type-card-title">{project.title}</h3>
        <p className="type-card-copy mt-4">{project.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies?.map((item, index) => (
            <span key={index} className="badge-pill">{item.technology.name}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            GitHub
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}
