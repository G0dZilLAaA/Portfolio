import portfolio from "../../data/portfolio";

export default function Contact() {

    const { personal } = portfolio;

    return (

        <section
            id="contact"
            className="bg-slate-950 py-24 text-white"
        >

            <div className="mx-auto max-w-4xl px-8 text-center">

                <h2 className="text-5xl font-bold">
                    Let's Connect
                </h2>

                <p className="mt-6 text-slate-400">
                    I'm always interested in discussing software engineering,
                    AI, backend development and exciting opportunities.
                </p>

                <div className="mt-12 space-y-5">

                    <a
                        href={`mailto:${personal.email}`}
                        className="block text-xl text-indigo-400 hover:underline"
                    >
                        {personal.email}
                    </a>

                    <a
                        href={personal.github}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-xl text-indigo-400 hover:underline"
                    >
                        GitHub
                    </a>

                    <a
                        href={personal.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-xl text-indigo-400 hover:underline"
                    >
                        LinkedIn
                    </a>

                </div>

            </div>

        </section>

    );

}