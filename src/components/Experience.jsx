const skills = ['Communication', 'Problem Solving', 'Coordination', 'Adaptability', 'Multitasking'];

export default function Experience() {
  return (
    <section className="section" id="experience">
      <span className="section-eyebrow" data-animate="0">Experience</span>
      <h2 className="section-heading" data-animate="1">Where I've worked</h2>

      <div className="exp-entry" data-animate="2">
        <div className="exp-meta">
          <span className="exp-role">Host</span>
          <span className="exp-sep">&middot;</span>
          <span className="exp-company">Chili's Grill &amp; Bar</span>
        </div>
        <p className="exp-desc">
          Managed guest flow, waitlists, and seating in a fast-paced restaurant environment.
          Worked closely with front-of-house and kitchen staff to keep service running smoothly.
          Built strong communication, adaptability, and real-time problem solving skills —
          operational thinking that carries directly into technical work.
        </p>
        <div className="exp-tags">
          {skills.map(s => (
            <span key={s} className="exp-tag">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
