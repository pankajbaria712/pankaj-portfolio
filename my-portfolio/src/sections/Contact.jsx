import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

// --- Components for Modularity ---

// Component for a single contact detail item
const ContactDetailItem = ({ Icon, href, text, isLink = true }) => (
  <li className="flex items-center gap-4 group">
    {/* Reduced icon size slightly for better alignment and used group-hover for a subtle effect */}
    <Icon
      className="text-sky-400 group-hover:text-sky-300 transition-colors duration-300 flex-shrink-0"
      size={20}
    />
    {isLink ? (
      <a
        href={href}
        target={href.startsWith("mailto:") ? "_self" : "_blank"} // mailto links should open in the current window/mail client
        rel="noopener noreferrer" // Added for security when using target="_blank"
        className="text-slate-300 hover:text-sky-400 transition-all duration-300 font-medium text-sm md:text-base break-words" // Added break-words for long links
      >
        {text}
      </a>
    ) : (
      <span className="text-slate-300 font-medium text-sm md:text-base">
        {text}
      </span>
    )}
  </li>
);

// Component for a single social media icon link
const SocialIconLink = ({ href, Icon }) => (
  <motion.a
    // Subtle hover animation for depth
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-slate-800 rounded-full transition-all duration-300 shadow-md hover:bg-sky-400/20 hover:shadow-sky-400/50"
    aria-label={`${Icon.displayName} link`} // Added aria-label for accessibility
  >
    <Icon size={22} className="text-sky-400" />
  </motion.a>
);

// --- Main Component ---

const Contact = () => {
  // 1. Improved: Added state management for the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://pankaj-portfolio-3285.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // clear the form
    } else {
      alert("❌ Failed to send message. Try again.");
    }
  };

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
    footer: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { delay: 0.5, duration: 0.5 },
      viewport: { once: true },
    },
  };

  const contactDetails = [
    {
      Icon: Mail,
      text: "pankajbaria712@gmail.com",
      href: "mailto:pankajbaria712@gmail.com",
      isLink: true,
    },
    // 3. Accessibility: Use 'tel:' for phone numbers
    {
      Icon: Phone,
      text: "+91 9023928572",
      href: "tel:+919023928572",
      isLink: true,
    },
    {
      Icon: Github,
      text: "github.com/pankajbaria712",
      href: "https://github.com/pankajbaria712",
      isLink: true,
    },
    {
      Icon: Linkedin,
      text: "linkedin.com/in/pankaj-baria-619253274",
      href: "https://www.linkedin.com/in/pankaj-baria-619253274/",
      isLink: true,
    },
  ];

  const socialLinks = [
    { Icon: Github, href: "https://github.com/pankajbaria712" },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/pankaj-baria-619253274/",
    },
    { Icon: Mail, href: "mailto:pankajbaria712@gmail.com" },
  ];

  return (
    <section
      id="contact"
      // Improved: Added max-w-full to ensure it respects the parent container width
      className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white px-4 sm:px-6 py-20 md:py-24"
    >
      {/* Section Header */}
      <motion.h2
        {...animationVariants.header}
        // Improved: Slightly adjusted text size for better responsiveness
        className="text-4xl md:text-5xl font-extrabold mb-14 text-center bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent tracking-tight"
      >
        Let’s Connect <span className="text-sky-400">💬</span>
      </motion.h2>

      {/* Container */}
      {/* Improved: Increased max width and adjusted gap for desktop */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left Side - Contact Info */}
        <motion.div
          {...animationVariants.left}
          // Improved: Added a slight glow/border effect on hover
          className="flex-1 bg-slate-900/70 p-6 sm:p-8 rounded-xl md:rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-sky-500/50 hover:shadow-sky-500/40"
        >
          <h3 className="text-2xl font-bold text-sky-400 mb-6">
            Contact Information
          </h3>
          <ul className="space-y-5">
            {contactDetails.map((item, index) => (
              <ContactDetailItem key={index} {...item} />
            ))}
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 sm:gap-5 mt-8 border-t border-slate-800 pt-6">
            {socialLinks.map((link, index) => (
              <SocialIconLink key={index} {...link} />
            ))}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          {...animationVariants.right}
          className="flex-1 bg-slate-900/70 p-6 sm:p-8 rounded-xl md:rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-sky-500/50 hover:shadow-sky-500/40"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold text-sky-400 mb-6">
            Send a Message
          </h3>

          <div className="space-y-5">
            {/* 4. Improvement: Added `name` attribute and `value`/`onChange` for state management */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              // Added focus ring and better subtle placeholder text
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300"
            />
            <textarea
              rows="6" // Increased rows for a better visual balance
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300 resize-none" // Added resize-none
            ></textarea>
          </div>

          <button
            type="submit"
            // Improved: Enhanced button styling with better shadow and hover effect
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 uppercase tracking-wider"
          >
            Send Message <Send size={20} />
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <motion.p
        {...animationVariants.footer}
        className="mt-16 text-slate-500 text-sm text-center"
      >
        © {new Date().getFullYear()} Pankaj Baria. All Rights Reserved. Built
        with React and Tailwind CSS.
      </motion.p>
    </section>
  );
};

export default Contact;
