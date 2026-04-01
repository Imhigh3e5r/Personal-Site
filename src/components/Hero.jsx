export default function Hero() {
  return (
    <section className="hero" id="hero">
      <h1 className="hero-name" data-animate="0">
        Muhammed Ozturk
      </h1>
      <p className="hero-sub" data-animate="1">
        Computer Science, Rutgers University
      </p>
      <p className="hero-desc" data-animate="2">
        I build efficient systems and solve real problems — focused on
        writing clean code and creating tools that are actually useful.
      </p>
      <div className="hero-actions" data-animate="3">
        <a href="#projects" className="hero-link hero-link-accent">Selected Work</a>
        <a href="#contact" className="hero-link">Contact</a>
      </div>
    </section>
  );
}
