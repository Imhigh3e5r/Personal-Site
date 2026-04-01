const facts = [
  {
    label: 'Education',
    value: 'Rutgers University',
    desc: 'Computer Science, New Brunswick',
  },
  {
    label: 'Focus',
    value: 'Systems & Algorithms',
    desc: 'Writing efficient, well-reasoned code',
  },
  {
    label: 'Driven by',
    value: 'Real Impact',
    desc: 'Tools that solve actual problems',
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <span className="section-eyebrow" data-animate="0">About</span>
      <h2 className="section-heading" data-animate="1">A bit about me</h2>

      <div className="about-grid">
        <div className="about-text" data-animate="2">
          <p>
            I'm a Computer Science student at Rutgers University–New Brunswick. I got into
            this field because I like understanding how systems work and figuring out how to
            make them better. Software development is where that interest comes alive for me.
          </p>
          <p>
            I care about building things that solve real problems — not just writing code
            for the sake of it. Whether it's optimizing an algorithm or designing a system
            from scratch, I focus on making things that work well.
          </p>
          <p>
            Right now I'm deepening my knowledge of data structures, algorithms, and
            software design. I learn best by building, debugging, and iterating.
          </p>
        </div>

        <div className="about-facts">
          {facts.map((f, i) => (
            <div key={f.label} className="about-fact" data-animate={String(i + 3)}>
              <div className="about-fact-label">{f.label}</div>
              <div className="about-fact-value">{f.value}</div>
              <div className="about-fact-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
