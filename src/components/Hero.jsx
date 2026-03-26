import { motion } from 'framer-motion';
import { ArrowDown, Send } from 'lucide-react';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <motion.div
          className="hero-gradient hero-gradient-1"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-gradient hero-gradient-2"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero-grid" />
      </div>

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="hero-label">
          <span className="hero-label-dot" />
          Open to Opportunities
        </motion.div>

        <motion.h1 variants={fadeUp} className="hero-name">
          Muhammed Ozturk
        </motion.h1>

        <motion.p variants={fadeUp} className="hero-title">
          Computer Science Student &middot; Problem Solver &middot; Builder
        </motion.p>

        <motion.p variants={fadeUp} className="hero-tagline">
          I build efficient systems, solve real problems, and constantly improve.
          Studying Computer Science at Rutgers, focused on writing clean code
          and creating tools that are actually useful.
        </motion.p>

        <motion.div variants={fadeUp} className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            <ArrowDown size={18} />
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            <Send size={18} />
            Contact Me
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
