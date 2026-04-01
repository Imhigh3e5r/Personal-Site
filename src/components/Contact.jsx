export default function Contact() {
  return (
    <section className="section" id="contact">
      <span className="section-eyebrow" data-animate="0">Contact</span>
      <h2 className="section-heading" data-animate="1">Let's connect</h2>

      <div className="contact-body">
        <p className="contact-text" data-animate="2">
          I'm currently looking for internships and opportunities.
          If you'd like to work together or just say hello, reach out.
        </p>
        <div className="contact-links" data-animate="3">
          <a href="mailto:your.email@example.com" className="contact-link">
            Email
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/muhammed-ozturk-602b36334/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
