import portfolio from "../../data/portfolio";

export default function Skills() {
    const { skills } = portfolio;

    const skillCategories = [
        {
            title: "Languages",
            data: skills.languages,
        },
        {
            title: "Frontend",
            data: skills.frontend,
        },
        {
            title: "Backend",
            data: skills.backend,
        },
        {
            title: "Database",
            data: skills.database,
        },
        {
            title: "Developer Tools",
            data: skills.tools,
        },
    ];

    return (
        <section
            id="skills"
            className="bg-slate-950 py-24 text-white"
        >
            <div className="mx-auto max-w-7xl px-8">

                <h2 className="mb-4 text-center text-5xl font-bold">
                    Technical Skills
                </h2>

                <p className="mx-auto mb-16 max-w-3xl text-center text-slate-400">
                    Technologies and tools that I use to design, develop and
                    deploy scalable applications.
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {skillCategories.map((category) => (

                        <div
                            key={category.title}
                            className="rounded-xl border border-slate-700 bg-slate-900 p-6 transition duration-300 hover:-translate-y-2 hover:border-indigo-500"
                        >

                            <h3 className="mb-5 text-2xl font-semibold">
                                {category.title}
                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {category.data.map((skill) => (

                                    <span
                                        key={skill}
                                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium"
                                    >
                                        {skill}
                                    </span>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}