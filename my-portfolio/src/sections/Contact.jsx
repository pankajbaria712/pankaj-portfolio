import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

// --- Contact Detail Item Component ---
const ContactDetailItem = ({ Icon, href, text, isLink = true }) => (
  <li className="flex items-center gap-4 group">
    <Icon
      className="text-sky-400 group-hover:text-sky-300 transition-colors duration-300 flex-shrink-0"
      size={20}
    />
    {isLink ? (
      <a
        href={href}
        target={href.startsWith("mailto:") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="text-slate-300 hover:text-sky-400 transition-all duration-300 font-medium text-sm md:text-base break-words"
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

// --- Social Icon Link Component ---
const SocialIconLink = ({ href, Icon }) => (
  <motion.a
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-slate-800 rounded-full transition-all duration-300 shadow-md hover:bg-sky-400/20 hover:shadow-sky-400/50"
    aria-label={`${Icon.displayName} link`}
  >
    <Icon size={22} className="text-sky-400" />
  </motion.a>
);

// --- Main Contact Component ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Input change handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://pankaj-portfolio-3285.onrender.com/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(`❌ Failed to send message: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Contact submit error:", error);
      alert("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Contact details
  const contactDetails = [
    {
      Icon: Mail,
      text: "pankajbaria712@gmail.com",
      href: "mailto:pankajbaria712@gmail.com",
    },
    {
      Icon: Phone,
      text: "+91 9023928572",
      href: "tel:+919023928572",
    },
    {
      Icon: Github,
      text: "github.com/pankajbaria712",
      href: "https://github.com/pankajbaria712",
    },
    {
      Icon: Linkedin,
      text: "linkedin.com/in/pankaj-baria-619253274",
      href: "https://www.linkedin.com/in/pankaj-baria-619253274/",
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
      className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-white px-4 sm:px-6 py-20 md:py-24"
    >
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold mb-14 text-center bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent tracking-tight"
      >
        Let’s Connect <span className="text-sky-400">💬</span>
      </motion.h2>

      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 bg-slate-900/70 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-sky-500/50 hover:shadow-sky-500/40"
        >
          <h3 className="text-2xl font-bold text-sky-400 mb-6">
            Contact Information
          </h3>
          <ul className="space-y-5">
            {contactDetails.map((item, idx) => (
              <ContactDetailItem key={idx} {...item} />
            ))}
          </ul>

          <div className="flex gap-4 sm:gap-5 mt-8 border-t border-slate-800 pt-6">
            {socialLinks.map((link, idx) => (
              <SocialIconLink key={idx} {...link} />
            ))}
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1 bg-slate-900/70 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-sky-500/50 hover:shadow-sky-500/40"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold text-sky-400 mb-6">
            Send a Message
          </h3>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
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
              rows="6"
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold py-3.5 rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 uppercase tracking-wider"
          >
            {loading ? "Sending..." : "Send Message"} <Send size={20} />
          </button>
        </motion.form>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 text-slate-500 text-sm text-center"
      >
        © {new Date().getFullYear()} Pankaj Baria. All Rights Reserved. Built
        with React & Tailwind CSS.
      </motion.p>
    </section>
  );
};

export default Contact;
