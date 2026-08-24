import portfolio from "../../data/portfolio";

export default function Skills() {
  const { skills } = portfolio;

  const skillCategories = [
    { title: "Languages", data: skills.languages },
    { title: "Frontend", data: skills.frontend },
    { title: "Backend", data: skills.backend },
    { title: "Database", data: skills.database },
    { title: "Developer Tools", data: skills.tools },
  ];

  return (
    <section id="skills" className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">Technical Skills</h2>
        <div className="section-divider" />
        <p className="type-body">A focused set of technologies and tools I use to build modern full-stack applications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-card hover-float">
            <h3 className="type-card-title mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-3">
              {category.data.map((skill) => (
                <span key={skill} className="tag-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
