import portfolio from "../../data/portfolio";

export default function About() {
  const { about, education, skills } = portfolio;
  const strengths = [
    "Clean architecture and component-driven design",
    "API-first backend engineering with Express and Prisma",
    "Responsive interfaces built for accessibility and clarity",
  ];
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

      <div className="section-inner lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start gap-6">
        <div className="glass-panel p-10">
          <span className="badge-pill">Academic profile</span>
          <h3 className="type-card-title mt-5">{education.degree}</h3>
          <p className="type-body mt-4">{education.college}</p>
          <div className="mt-8 space-y-4">
            {strengths.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 p-5">
                <p className="type-card-copy">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="card-panel p-10">
            <span className="badge-pill">Career objective</span>
            <h3 className="type-card-title mt-4">Building scalable software with an emphasis on usability.</h3>
            <p className="type-body mt-4">
              I enjoy architecting applications that are maintainable, visually refined, and connected to real-world backend workflows.
            </p>
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
