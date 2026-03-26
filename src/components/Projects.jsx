import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, SortAsc, Bot, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: i * 0.12 },
  }),
};

const projects = [
  {
    icon: <TrendingUp size={24} />,
    title: 'Stock Market Simulation',
    tech: ['Java', 'Data Structures', 'Algorithms'],
    desc: 'Built a stock trading simulation using arrays and linked lists. Implemented buy/sell logic, transaction tracking, and ROI calculations, with a strong focus on data structures and algorithm efficiency.',
  },
  {
    icon: <SortAsc size={24} />,
    title: 'Mario Sort',
    tech: ['Java', 'Sorting Algorithms', 'OOP'],
    desc: 'Implemented Insertion Sort and Merge Sort on custom objects, sorting based on metrics like lap times, stars, and coins. Focused on algorithm design, object handling, and performance logic.',
  },
  {
    icon: <Bot size={24} />,
    title: 'Appliance Troubleshooting AI',
    tech: ['AI / Product Concept', 'UX Thinking'],
    desc: 'Designed the concept for a system where users upload a model number or image and receive troubleshooting help, manuals, and support guidance. A useful AI tool aimed at solving real-world problems for everyday users.',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section" id="projects" ref={ref}>
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <span className="section-label">Projects</span>
        <h2 className="section-title">What I've built</h2>
        <p className="section-subtitle">
          A selection of projects that reflect how I think, learn, and solve problems.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            className="project-card"
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className="project-icon">{p.icon}</div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">
              {p.tech.map(t => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
            <span className="project-link">
              View Details <ArrowRight size={16} />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
