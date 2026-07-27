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

    if (loading) {

        return (
            <section
                id="projects"
                className="bg-slate-950 py-24 text-center text-white"
            >
                <h2 className="text-5xl font-bold">
                    Featured Projects
                </h2>

                <p className="mt-10 text-slate-400">
                    Loading projects...
                </p>
            </section>
        );

    }

    if (error) {

        return (
            <section
                id="projects"
                className="bg-slate-950 py-24 text-center text-white"
            >
                <h2 className="text-5xl font-bold">
                    Featured Projects
                </h2>

                <p className="mt-10 text-red-500">
                    {error}
                </p>
            </section>
        );

    }

    return (

        <section
            id="projects"
            className="bg-slate-950 py-24 text-white"
        >

            <div className="mx-auto max-w-7xl px-8">

                <h2 className="mb-4 text-center text-5xl font-bold">
                    Featured Projects
                </h2>

                <p className="mx-auto mb-16 max-w-3xl text-center text-slate-400">
                    Some of my recent projects built using modern technologies,
                    AI, backend development and cloud deployment.
                </p>

                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                    {projects.length === 0 ? (

                        <p>No Projects Found.</p>

                    ) : (

                        projects.map((project) => (

                            <ProjectCard
                                key={project.id}
                                project={project}
                            />

                        ))

                    )}

                </div>

            </div>

        </section>

    );

}