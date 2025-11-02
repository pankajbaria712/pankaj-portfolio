import { motion } from "framer-motion";
import { GraduationCap, Laptop, Rocket, Zap } from "lucide-react";

// --- Data for the Timeline ---
const experiences = [
  // New entry: Sherians Cohort 2.0 (Added at the top as the most current)
  {
    year: "Cohart 2.0 (Current)",
    title: "Complete Web Dev + DSA + Gen-AI",
    place: "Sherians Coding School",
    description:
      "Enrolled in the Job Ready AI Powered Cohort 2.0, focusing on complete Full-Stack Web Development, Data Structures & Algorithms (DSA), Generative AI integration, and Aptitude training.",
    icon: <Zap className="text-cyan-300" />, // Changed icon to Zap for energy/AI focus
  },
  {
    year: "2024 – Present",
    title: "B.E. in Computer Engineering",
    place: "Government Engineering College, Modasa",
    description:
      "Currently pursuing a Bachelor’s in Computer Engineering with a focus on Web Development, Data Structures, and Software Engineering.",
    icon: <GraduationCap className="text-sky-400" />,
  },
  {
    year: "2021 – 2024",
    title: "Diploma in Computer Engineering",
    place: "Government Polytechnic, Dahod",
    description:
      "Completed Diploma in Computer Engineering. Built several academic projects and developed strong fundamentals in programming and problem solving.",
    icon: <GraduationCap className="text-sky-400" />,
  },
  {
    year: "2023 – Present",
    title: "Self Learning & Real-World Projects",
    place: "Personal Development",
    description:
      "Developed multiple real-world web projects using React.js, Node.js, Express, and MongoDB. Focused on writing clean, scalable, and maintainable code.",
    icon: <Laptop className="text-sky-400" />,
  },
  {
    year: "2024 – Present",
    title: "Exploring AI & Machine Learning",
    place: "Passion Project",
    description:
      "Currently exploring GenAI tools, Machine Learning models, and integrating AI APIs to build intelligent web applications.",
    icon: <Rocket className="text-sky-400" />,
  },
];

// --- Sub-Component for a single Timeline Item ---
const TimelineItem = ({ exp, index }) => {
  const isEven = index % 2 === 0;

  // Defines where the card should be positioned
  const cardClasses = `
    bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-6 w-full
    md:w-[45%] transition-all duration-300 hover:shadow-2xl
    hover:border-sky-500/50 hover:shadow-sky-500/40
    ${isEven ? "md:mr-auto" : "md:ml-auto"}
  `;

  // Defines the starting animation direction
  const animationProps = {
    initial: { opacity: 0, x: isEven ? -40 : 40 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.7, delay: index * 0.1 },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <motion.div
      key={index}
      {...animationProps}
      // Layout classes for the main container (handles mobile stacking and desktop alternating)
      className={`relative flex items-center ${
        isEven ? "justify-start" : "justify-end"
      } w-full`}
    >
      {/* Connector Dot - Always centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bg-sky-400 rounded-full w-5 h-5 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(56,189,248,0.7)] hidden md:block"></div>

      {/* Mobile Dot - Positioned on the far left for small screens */}
      <div className="absolute left-0 transform -translate-x-1/2 bg-sky-400 rounded-full w-4 h-4 border-4 border-slate-900 z-10 block md:hidden"></div>

      {/* Card */}
      <div className={cardClasses}>
        <div className="flex items-start gap-4 mb-2">
          {/* Icon with a larger size and subtle rotation on hover for the item */}
          <div className="text-2xl pt-1">{exp.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-sky-300">{exp.title}</h3>
            <p className="text-slate-400 text-sm italic">{exp.place}</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-2">{exp.description}</p>
        <p className="text-xs font-semibold text-cyan-500 mt-3 border-t border-slate-700 pt-2">
          {exp.year}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
const Experience = () => {
  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white px-4 py-20 md:py-24"
    >
      {/* Section Header with Student Status and Link */}
      <motion.div
        {...headerVariants}
        className="text-center mb-16 max-w-4xl px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent tracking-tight">
          My Learning Journey
        </h2>

        {/* Student Status Subtitle */}
        <p className="text-lg text-slate-300 font-medium mt-4">
          Student of{" "}
          <a
            href="https://www.sheryians.com/"
            target="_blank"
            rel="noopener noreferrer"
            // Stronger visual emphasis on the school link
            className="text-cyan-300 hover:text-cyan-400 font-bold underline decoration-2 decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors duration-300"
          >
            Sherians Coding School
          </a>
          , Cohort 2.0: Job Ready AI Powered
        </p>
        <p className="text-sm text-slate-500 max-w-xl mx-auto mt-1">
          Complete Web Development + DSA + Gen-AI + Aptitude
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl">
        {/* Central Line (hidden on mobile, only appears on medium screens and up) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-sky-700/60 hidden md:block"></div>

        {/* Mobile Line (for the left edge on small screens) */}
        <div className="absolute left-0 h-full border-l-2 border-sky-700/60 block md:hidden ml-2"></div>

        {/* Timeline Items */}
        <div className="flex flex-col space-y-12 pl-4 md:pl-0">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
