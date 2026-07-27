import portfolio from "../../data/portfolio";

export default function About() {
    const { about, education } = portfolio;

    return (
        <section
            id="about"
            className="bg-slate-900 py-24 text-white"
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-8 lg:flex-row">

                <div className="flex justify-center lg:w-1/3">
                    <div className="flex h-72 w-72 items-center justify-center rounded-full border-4 border-indigo-500 bg-slate-800 text-7xl font-bold">
                        MK
                    </div>
                </div>

                <div className="lg:w-2/3">

                    <h2 className="mb-6 text-5xl font-bold">
                        {about.title}
                    </h2>

                    <p className="text-lg leading-8 text-slate-300">
                        {about.description}
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <div className="rounded-lg bg-slate-800 p-6">

                            <h3 className="mb-3 text-xl font-semibold">
                                Education
                            </h3>

                            <p>{education.degree}</p>

                            <p className="text-slate-400">
                                {education.college}
                            </p>

                            <p className="mt-3">
                                CPI : {education.cpi}
                            </p>

                        </div>

                        <div className="rounded-lg bg-slate-800 p-6">

                            <h3 className="mb-3 text-xl font-semibold">
                                Career Objective
                            </h3>

                            <p className="text-slate-300">
                                Passionate about building scalable web
                                applications, backend systems and AI-powered
                                software while continuously improving software
                                engineering skills.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}