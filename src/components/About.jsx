import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Code, Lightbulb } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

const highlights = [
  {
    icon: <GraduationCap size={20} />,
    title: 'Rutgers University',
    desc: 'Computer Science @ New Brunswick',
  },
  {
    icon: <Code size={20} />,
    title: 'Builder Mindset',
    desc: 'Focused on writing clean, efficient code',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Problem Solver',
    desc: 'Driven by real-world impact and useful systems',
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="about" ref={ref}>
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className="section-label">About</span>
        <h2 className="section-title">A bit about me</h2>
      </motion.div>

      <div className="about-content">
        <motion.div
          className="about-text"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p>
            I'm a Computer Science student at Rutgers University–New Brunswick. I got into
            this field because I like understanding how systems work and figuring out how to
            make them better. Software development is where that interest comes alive for me.
          </p>
          <p>
            I care about building things that solve real problems — not just writing code for the
            sake of it. I'm drawn to projects where I can combine technical thinking with an
            understanding of what people actually need. Whether it's optimizing an algorithm or
            designing a system from scratch, I focus on making things that work well.
          </p>
          <p>
            Right now, I'm deepening my knowledge of data structures, algorithms, and
            software design. I learn best by building, debugging, and iterating — and I'm
            always looking for the next challenge.
          </p>
        </motion.div>

        <div className="about-highlights">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              className="highlight-card"
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className="highlight-icon">{h.icon}</div>
              <div className="highlight-title">{h.title}</div>
              <div className="highlight-desc">{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
