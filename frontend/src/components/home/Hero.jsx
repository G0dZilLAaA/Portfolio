import portfolio from "../../data/portfolio";

export default function Hero() {
    const { personal } = portfolio;

    function scrollTo(id) {
        const section = document.getElementById(id);

        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <section className="flex min-h-screen items-center bg-slate-950 text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-8 text-center">

                <p className="mb-4 text-lg text-indigo-400">
                    Hello, I'm
                </p>

                <h1 className="mb-6 text-6xl font-extrabold">
                    {personal.name}
                </h1>

                <h2 className="mb-6 text-3xl font-semibold text-slate-300">
                    {personal.role}
                </h2>

                <p className="max-w-3xl text-lg leading-8 text-slate-400">
                    Passionate about building scalable web applications,
                    backend systems, and AI-powered software using modern
                    technologies. I enjoy solving real-world problems through
                    clean architecture and continuous learning.
                </p>

                <div className="mt-12 flex flex-wrap justify-center gap-6">

                    <button
                        onClick={() => scrollTo("projects")}
                        className="rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold transition hover:bg-indigo-700"
                    >
                        View Projects
                    </button>

                    <button
                        onClick={() => scrollTo("contact")}
                        className="rounded-lg border border-indigo-500 px-8 py-4 text-lg font-semibold transition hover:bg-indigo-600"
                    >
                        Contact Me
                    </button>

                </div>

            </div>
        </section>
    );
}