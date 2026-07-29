import portfolio from "../../data/portfolio";

export default function About() {
  const { about, education, skills } = portfolio;
  const stats = [
    { label: "Languages", value: skills.languages.length },
    { label: "Frontend", value: skills.frontend.length },
    { label: "Backend", value: skills.backend.length },
    { label: "Database", value: skills.database.length },
  ];

  return (
    <section id="about" className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">About Me</h2>
        <div className="section-divider" />
        <p className="type-body">{about.description}</p>
      </div>

      <div className="section-inner lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="glass-panel p-10">
          <div className="flex h-full flex-col justify-between gap-8">
            <div>
              <span className="badge-pill">Education</span>
              <h3 className="type-card-title mt-5">{education.degree}</h3>
              <p className="type-body mt-4">{education.college}</p>
            </div>
            <div>
              <span className="badge-pill">Career Objective</span>
              <p className="type-body mt-4">
                Passionate about building scalable web applications, backend systems and AI-powered software while continuously improving software engineering skills.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="card-panel p-10">
            <h3 className="type-card-title">Professional Summary</h3>
            <p className="type-body mt-4">Experienced in creating robust, maintainable applications using React, Tailwind CSS, Express.js, Prisma, PostgreSQL and modern authentication flows with JWT.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.label} className="glass-panel p-6">
                <p className="type-card-title">{item.value}+</p>
                <p className="type-meta mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
