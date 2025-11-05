import { motion } from "framer-motion";
import RotatingText from "react-rotating-text";
import { ArrowDown, ArrowRight } from "lucide-react";
import profile from "../assets/profile.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-slate-950 text-white px-6 relative overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Content Wrapper */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center max-w-6xl mx-auto gap-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex-1"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-sky-400">
            Hey, I’m <span className="text-white">Pankaj Baria 👋</span>
          </h1>

          <h2 className="text-lg md:text-2xl text-slate-400 mb-4">
            I’m a{" "}
            <span className="text-sky-400 font-semibold">
              <RotatingText
                items={[
                  "Frontend Developer",
                  "React Enthusiast",
                  "UI/UX Learner",
                  "Web Developer",
                ]}
              />
            </span>
          </h2>

          <p className="text-slate-400 max-w-md mb-6 leading-relaxed mx-auto md:mx-0">
            I love creating clean, modern, and responsive web experiences using
            React, Tailwind CSS, and modern design principles.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300"
            >
              View Projects <ArrowRight size={18} />
            </a>

            <a
              href="/Pankaj-Resume.pdf"
              target="_blank"
              className="border border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white px-6 py-3 rounded-full transition-all duration-300"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center md:justify-end flex-1"
        >
          <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 to-purple-500 animate-pulse blur-md" />
            <img
              src={profile}
              alt="Profile"
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-slate-900 shadow-lg"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sky-400 flex flex-col items-center"
      >
        <ArrowDown size={24} />
        <span className="text-xs mt-1 text-slate-400 tracking-widest">
          SCROLL
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
