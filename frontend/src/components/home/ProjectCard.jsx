export default function ProjectCard({ project }) {

    return (

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg">

            <img
                src="https://placehold.co/600x350/1e293b/ffffff?text=DeveloperHub"
                alt={project.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                    {project.title}
                </h3>

                <p className="mt-3 text-slate-400">
                    {project.shortDescription}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">

                    {project.technologies?.map((item, index) => (

                        <span
                            key={index}
                            className="rounded-full bg-indigo-600 px-3 py-1 text-sm text-white"
                        >
                            {item.technology.name}
                        </span>

                    ))}

                </div>

                <div className="mt-6 flex gap-4">

                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-slate-700 px-4 py-2 text-white"
                    >
                        GitHub
                    </a>

                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-indigo-600 px-4 py-2 text-white"
                    >
                        Live Demo
                    </a>

                </div>

            </div>

        </div>

    );

}