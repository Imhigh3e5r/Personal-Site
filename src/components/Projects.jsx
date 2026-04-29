const projects = [
  {
    title: 'Stock Market Simulation',
    tech: ['Java', 'Data Structures', 'Algorithms'],
    desc: 'Built a stock trading simulation using arrays and linked lists. Implemented buy/sell logic, transaction tracking, and ROI calculations with a focus on data structure efficiency.',
  },
  {
    title: 'Redline',
    tech: ['React', 'JavaScript', 'Product Design', 'UX/UI'],
    desc: 'Built a car-focused social platform where users can share car photos, view profiles, and interact through a clean, modern interface. Designed the project with a premium visual style, real-world product thinking, and scalable social app features in mind.',
    href: 'https://redlineapp.netlify.app/',
    favicon: 'https://redlineapp.netlify.app/favicon.ico',
  },
  {
    title: 'Appliance Troubleshooting AI',
    tech: ['AI / Product Concept', 'UX Thinking'],
    desc: 'Designed a concept where users upload a model number or image and receive troubleshooting help, manuals, and support guidance — aimed at solving real-world problems for everyday users.',
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <span className="section-eyebrow" data-animate="0">Projects</span>
      <h2 className="section-heading" data-animate="1">What I've built</h2>
      <p className="section-lead" data-animate="2">
        A selection of projects that reflect how I think, learn, and solve problems.
      </p>

      <div className="projects-list">
        {projects.map((p, i) => (
          <div key={p.title} className="project-item" data-animate={String(i + 3)}>
            <h3 className="project-title">
              {p.favicon && (
                <img src={p.favicon} alt="" className="project-favicon" width="16" height="16" />
              )}
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" className="project-link">
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tech.map(t => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
