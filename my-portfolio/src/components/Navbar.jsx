import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Send } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Links data structure now includes IDs for better scroll targeting
  const links = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Contact", id: "contact" }, // Added Contact link to the main list for desktop
  ];

  // Function to handle native smooth scrolling
  const scrollToSection = (id, offset = 0) => {
    // Attempt to find the element by its ID
    const element = document.getElementById(id);

    if (element) {
      // Calculate the target position: element's top position - offset (for fixed header)
      const targetPosition = element.offsetTop + offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth", // Use native smooth scrolling
      });
    }
    // Close the mobile menu after clicking a link
    setIsOpen(false);
  };

  // The offset for the fixed navbar height (set to -80 for desktop links)
  const navOffset = -80;

  // Base classes for cleaner desktop link styling (with custom underline hover effect)
  const baseLinkClasses =
    "cursor-pointer text-sm font-medium tracking-wide text-slate-300 hover:text-sky-400 transition-colors duration-300 relative group";
  const underlineClasses =
    "absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left";

  return (
    <motion.nav
      // Enhanced initial animation for a smoother entrance
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
      // Improved background blur and shadow for fixed navbar
      className="fixed w-full top-0 left-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 shadow-xl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3.5">
        {/* Logo/Brand: Now links back to the About section (assumed top of page) */}
        <div
          onClick={() => scrollToSection("about", 0)} // Scroll to top (offset 0)
          className="cursor-pointer select-none"
        >
          <h1 className="text-2xl font-extrabold text-sky-400">
            Pankaj<span className="text-white font-light">.dev</span>
          </h1>
        </div>

        {/* Desktop Links & Call-to-Action (CTA) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Filter out Contact link if we want it to be a separate CTA button, or include it */}
          {links
            .filter((link) => link.id !== "contact") // Show Contact only as a button
            .map((link) => (
              <div
                key={link.id}
                onClick={() => scrollToSection(link.id, navOffset)}
                className={baseLinkClasses}
              >
                {link.name}
                {/* Custom hover underline */}
                <span className={underlineClasses} />
              </div>
            ))}

          {/* Primary CTA Button: "Get in Touch" for strong recruiter visibility */}
          <button
            onClick={() => scrollToSection("contact", navOffset)}
            className="ml-4 px-4 py-2 text-sm font-semibold rounded-full bg-sky-600 text-white hover:bg-sky-500 transition-colors duration-300 flex items-center gap-2 shadow-md hover:shadow-lg shadow-sky-900/50"
          >
            <Send size={16} /> Get in Touch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-sky-400 z-50 p-2 rounded-full hover:bg-slate-800 transition-colors duration-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu with Framer Motion transitions */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col items-center gap-4 py-4 bg-slate-950/95 border-t border-slate-800 w-full"
        >
          {/* Mobile links now include Contact */}
          {links.map((link) => (
            <div
              key={link.id}
              onClick={() => scrollToSection(link.id, navOffset)}
              className="cursor-pointer text-lg font-medium text-slate-200 hover:text-sky-400 transition-colors duration-200 w-full text-center py-2"
            >
              {link.name}
            </div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
