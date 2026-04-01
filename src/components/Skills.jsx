const skills = [
  { category: 'Languages', items: ['Java', 'JavaScript'] },
  {
    category: 'Concepts',
    items: ['Data Structures & Algorithms', 'OOP', 'Debugging', 'Problem Solving'],
  },
  { category: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Claude'] },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <span className="section-eyebrow" data-animate="0">Skills</span>
      <h2 className="section-heading" data-animate="1">What I work with</h2>
      <p className="section-lead" data-animate="2">
        Languages, concepts, and tools I use to build and learn.
      </p>

      <div className="skills-table">
        {skills.map((s, i) => (
          <div key={s.category} className="skills-row" data-animate={String(i + 3)}>
            <span className="skills-category">{s.category}</span>
            <div className="skills-chips">
              {s.items.map(item => (
                <span key={item} className="skill-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
