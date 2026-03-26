import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.1 },
  }),
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="experience" ref={ref}>
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className="section-label">Experience</span>
        <h2 className="section-title">Where I've worked</h2>
      </motion.div>

      <motion.div
        className="experience-card"
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="exp-header">
          <div className="exp-icon">
            <Briefcase size={22} />
          </div>
          <div>
            <div className="exp-role">Host</div>
            <div className="exp-company">Chili's Grill & Bar</div>
          </div>
        </div>
        <p className="exp-desc">
          Managed guest flow, waitlists, and seating coordination in a fast-paced
          restaurant environment. Worked closely with front-of-house and kitchen staff to
          keep service running smoothly. Built strong skills in communication, adaptability,
          multitasking, and real-time problem solving — the kind of operational thinking that
          carries over directly into technical work.
        </p>
        <div className="exp-skills">
          <span className="exp-skill">Communication</span>
          <span className="exp-skill">Problem Solving</span>
          <span className="exp-skill">Coordination</span>
          <span className="exp-skill">Adaptability</span>
          <span className="exp-skill">Multitasking</span>
        </div>
      </motion.div>
    </section>
  );
}
