import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'JavaScript'],
  },
  {
    title: 'Concepts',
    skills: ['Data Structures & Algorithms', 'Debugging', 'Problem Solving', 'Object-Oriented Programming'],
  },
  {
    title: 'Tools',
    skills: ['GitHub', 'VS Code', "Claude"],

  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="skills" ref={ref}>
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className="section-label">Skills</span>
        <h2 className="section-title">What I work with</h2>
        <p className="section-subtitle">
          Languages, concepts, and tools I use to build and learn.
        </p>
      </motion.div>

      <div className="skills-grid">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            className="skill-category"
            custom={ci + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="skill-cat-title">{cat.title}</div>
            <div className="skill-items">
              {cat.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  className="skill-chip"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: (ci + 1) * 0.1 + si * 0.06 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
