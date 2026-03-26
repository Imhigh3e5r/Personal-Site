import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, ExternalLink, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className="section-label">Contact</span>
        <h2 className="section-title">Let's connect</h2>
      </motion.div>

      <motion.div
        className="contact-content"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <p className="contact-text">
          I'm currently looking for internships and opportunities.<br />
          If you'd like to work together or just say hello, reach out.
        </p>

        <div className="contact-buttons">
          <a href="mailto:your.email@example.com" className="btn btn-primary">
            <Mail size={18} />
            Email Me
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <ExternalLink size={18} />
            LinkedIn
            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
