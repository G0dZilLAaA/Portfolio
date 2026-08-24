export default function Experience() {
  return (
    <section id="experience" className="section-block">
      <div className="section-heading fade-in-up">
        <h2 className="type-heading">Experience</h2>
        <div className="section-divider" />
        <p className="type-body">A concise timeline of the technical work and professional growth behind my portfolio.</p>
      </div>

      <div className="timeline-shell">
        <div className="timeline-track">
          <article className="timeline-card slide-in">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="type-card-title">Advanced Engineering Hub Intern</h3>
                <p className="type-meta text-secondary mt-2">Accenture</p>
              </div>
              <span className="type-meta">May 2026 - July 2026</span>
            </div>

            <ul className="mt-6 list-disc space-y-3 pl-5 type-body text-muted-soft">
              <li>Explored enterprise applications of Generative AI and Agentic AI for intelligent software automation.</li>
              <li>Worked on identity lifecycle management, provisioning, and authentication integration.</li>
              <li>Delivered AI-assisted test automation workflows within Agile team processes.</li>
              <li>Strengthened understanding of cybersecurity, governance, and IAM best practices.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
