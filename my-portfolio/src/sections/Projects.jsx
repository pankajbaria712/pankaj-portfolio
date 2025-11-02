import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import project1 from "../assets/projects/project-01.png";
import project2 from "../assets/projects/project-02.png";
import project3 from "../assets/projects/project-03.png";
import project4 from "../assets/projects/project-04.png";

const projects = [
  {
    title: "Skill Tracker and Personalized Roadmap Generator",
    description:
      "A web application to track skills and generate personalized learning roadmaps. Features user authentication and interactive dashboards.",
    img: project1,
    github:
      "https://github.com/pankajbaria712/Skill-Tracker-and-Personalized-Roadmap-Generator",
    demo: "https://skill-tracker-and-personalized-road.vercel.app/",
  },
  {
    title: "Learn and Practice Typing Platform",
    description:
      "An interactive typing practice platform with various levels, statistics tracking, and a modern UI.",
    img: project2,
    github:
      "https://github.com/pankajbaria712/Learn-and-Practice-Typing-Platform",
    demo: "https://learn-and-practice-typing-platform-seven.vercel.app/",
  },
  {
    title: "Local Food Platform",
    description:
      "A food delivery web platform connecting local restaurants with customers. Includes ordering, tracking, and responsive design.",
    img: project3,
    github: "https://github.com/pankajbaria712/local-food-platform",
    demo: "https://local-food-platform.vercel.app/",
  },
  {
    title: "Alvy Template Clone",
    description:
      "Frontend clone of Alvy Template Webflow. Focused on UI/UX replication using only HTML and SCSS.",
    img: project4,
    github:
      "https://github.com/pankajbaria712/alvy-template.webflow.io-frontend-clone",
    demo: "https://pankajbaria712.github.io/alvy-template.webflow.io-frontend-clone/",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white px-6 py-16"
    >
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-12 text-sky-400 text-center"
      >
        My Projects
      </motion.h2>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            {/* Project Image */}
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            {/* Project Info */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-2 text-sky-400">
                {project.title}
              </h3>
              <p className="text-slate-300 flex-1 mb-4">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex gap-4 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  className="text-sky-400 hover:text-white flex items-center gap-1 font-semibold transition-all duration-300"
                >
                  GitHub <ArrowUpRight size={18} />
                </a>
                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    className="text-sky-400 hover:text-white flex items-center gap-1 font-semibold transition-all duration-300"
                  >
                    Live Demo <ArrowUpRight size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
