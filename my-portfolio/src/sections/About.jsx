import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Zap,
  Code2,
  Layers3,
  ArrowUpRight,
  Atom,
  Package,
  Server,
  Database,
  Palette,
  Braces,
  GitBranch,
  Cloud,
  FileCode,
  LayoutGrid,
} from "lucide-react";

// The icons from 'react-icons/si' have been replaced with available 'lucide-react' icons
// 1. Improved Tech Stack: Focused on MERN stack, development tools, and deployment
const techStack = [
  { name: "React.js", icon: <Atom className="text-sky-400" /> },
  { name: "Node.js", icon: <Package className="text-green-500" /> },
  { name: "Express.js", icon: <Server className="text-slate-200" /> },
  { name: "MongoDB", icon: <Database className="text-green-400" /> },
  { name: "Tailwind CSS", icon: <Palette className="text-cyan-400" /> },
  { name: "JavaScript", icon: <Braces className="text-yellow-400" /> },
  { name: "Git", icon: <GitBranch className="text-red-500" /> },
  { name: "Deployment", icon: <Cloud className="text-gray-300" /> },
  { name: "HTML5", icon: <FileCode className="text-orange-500" /> },
  { name: "CSS3", icon: <LayoutGrid className="text-blue-500" /> },
];

// Helper component for Tech Icon for clean main component
const TechIcon = ({ tech }) => (
  <motion.div
    whileHover={{
      scale: 1.05, // Slightly reduced scale for subtler modern effect
      boxShadow: "0 0 20px rgba(56,189,248,0.5)", // Stronger glow effect
    }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="flex flex-col items-center text-slate-300 p-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 cursor-pointer shadow-lg transition-all duration-300"
    // **Removed border classes: border border-slate-700**
  >
    <div className="text-4xl mb-2">{tech.icon}</div>
    <p className="text-xs font-medium text-center text-slate-200">
      {tech.name}
    </p>
  </motion.div>
);

// Helper component for Key Attribute list
const KeyAttribute = ({ Icon, text, link, linkText }) => (
  <li className="flex items-start gap-3">
    <Icon className="text-sky-400 mt-1 flex-shrink-0" size={20} />
    <span className="text-slate-300 leading-snug">
      {text}
      {link && linkText && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-sky-300 transition-colors duration-300 inline-flex items-center font-medium"
        >
          {linkText}
          <ArrowUpRight size={14} className="ml-1" />
        </a>
      )}
    </span>
  </li>
);

const About = () => {
  const animationVariants = {
    header: {
      initial: { opacity: 0, y: 30 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
      viewport: { once: true, amount: 0.5 },
    },
    left: {
      initial: { opacity: 0, x: -40 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" },
      viewport: { once: true, amount: 0.3 },
    },
    right: {
      initial: { opacity: 0, x: 40 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.7, ease: "easeOut" },
      viewport: { once: true, amount: 0.3 },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white px-1 sm:px-6 py-10 md:py-10"
    >
      {/* Section Header */}
      <motion.h2
        {...animationVariants.header}
        className="text-4xl md:text-5xl font-extrabold mb-16 text-center bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent tracking-tight"
      >
        Who I Am
      </motion.h2>

      {/* Main Content Container: Cleaned up borders and shadows */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-stretch gap-14 p-6 md:p-12  ">
        {/* Removed: border-2 border-slate-800 */}

        {/* Left - Professional Summary & Key Attributes */}
        <motion.div {...animationVariants.left} className="flex-1 lg:w-1/2">
          {/* 2. Recruiter-Focused Bio */}
          <h3 className="text-3xl font-bold text-sky-400 mb-4 tracking-wide">
            Pankaj Baria
          </h3>
          <p className="text-slate-300 leading-relaxed text-lg mb-8 border-b border-slate-700/50 pb-6">
            I'm a <b>Full-Stack Web Developer</b> and{" "}
            <b>Computer Engineering</b> student, driven by a passion for
            creating scalable, high-performance web applications. My focus is
            blending robust <b>MERN stack development</b>
            with modern skills like <b>Data Structures (DSA)</b> and{" "}
            <b>Generative AI</b> integration. I thrive on problem-solving and
            clean, efficient code delivery.
          </p>

          {/* 3. Key Attributes List (Action-oriented) */}
          <h4 className="text-xl font-semibold text-cyan-300 mb-4 flex items-center gap-2">
            <Layers3 size={24} /> Key Focus & Training
          </h4>
          <ul className="space-y-4 text-slate-400">
            <KeyAttribute
              Icon={Zap}
              text="Currently completing the Job Ready AI Powered Cohort 2.0 at"
              link="https://www.sheryians.com/"
              linkText="Sherians Coding School"
            />
            <KeyAttribute
              Icon={Code2}
              text="Expertise in the MERN Stack (MongoDB, Express, React, Node.js) and building RESTful APIs."
            />
            <KeyAttribute
              Icon={Layers3}
              text="Strong foundation in Data Structures & Algorithms (DSA) for building scalable solutions."
            />
          </ul>

          {/* Social Links (Enhanced styling)
          <div className="flex justify-start gap-6 mt-10 border-t border-slate-800/50 pt-6">
            <a
              href="https://github.com/pankajbaria712"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 p-2 rounded-full hover:text-sky-400 hover:bg-slate-700/40 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/pankaj-baria-619253274/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 p-2 rounded-full hover:text-sky-400 hover:bg-slate-700/40 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={32} />
            </a>
          </div> */}
        </motion.div>

        {/* Right - Tech Stack Grid */}
        <motion.div
          {...animationVariants.right}
          className="flex-1 lg:w-1/2 p-6 bg-slate-800/60 rounded-2xl  backdrop-blur-md lg:self-start"
        >
          <h3 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-3 justify-center lg:justify-start border-b border-slate-700/50 pb-4">
            <Code2 size={24} /> Core Technology Stack
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {techStack.map((tech, index) => (
              <TechIcon key={index} tech={tech} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
