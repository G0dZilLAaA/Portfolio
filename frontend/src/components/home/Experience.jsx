export default function Experience() {
    return (
        <section
            id="experience"
            className="bg-slate-900 py-24 text-white"
        >
            <div className="mx-auto max-w-7xl px-8">

                <h2 className="mb-4 text-center text-5xl font-bold">
                    Experience
                </h2>

                <p className="mx-auto mb-16 max-w-3xl text-center text-slate-400">
                    My professional experience building enterprise software and
                    AI-powered solutions.
                </p>

                <div className="relative border-l-4 border-indigo-600 pl-10">

                    <div className="relative mb-14">

                        <div className="absolute -left-[53px] h-6 w-6 rounded-full border-4 border-indigo-600 bg-slate-900"></div>

                        <div className="rounded-xl border border-slate-700 bg-slate-800 p-8">

                            <div className="flex flex-col justify-between gap-2 md:flex-row">

                                <div>

                                    <h3 className="text-3xl font-bold">
                                        Advanced Engineering Hub Intern
                                    </h3>

                                    <p className="text-indigo-400 text-lg">
                                        Accenture
                                    </p>

                                </div>

                                <span className="text-slate-400">
                                    May 2026 - July 2026
                                </span>

                            </div>

                            <ul className="mt-8 list-disc space-y-3 pl-6 text-slate-300">

                                <li>
                                    Explored enterprise applications of
                                    Generative AI and Agentic AI for intelligent
                                    software development and automation.
                                </li>

                                <li>
                                    Worked with SailPoint IdentityIQ,
                                    provisioning, role management, identity
                                    lifecycle management and authentication.
                                </li>

                                <li>
                                    Contributed to AI-assisted enterprise test
                                    automation within Agile software
                                    development.
                                </li>

                                <li>
                                    Learned enterprise Identity & Access
                                    Management, cybersecurity principles and
                                    governance models.
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}