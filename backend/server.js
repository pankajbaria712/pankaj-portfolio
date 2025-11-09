import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// (If Node <18, uncomment next line)
// import fetch from "node-fetch";

dotenv.config();
const app = express();

// ------------------ CORS Setup ------------------
app.use(
  cors({
    origin: "https://pankaj-portfolio-ivory.vercel.app",
    methods: ["POST", "GET"],
  })
);

// ------------------ Body Parser ------------------
app.use(express.json());

// ------------------ Routes ------------------
app.get("/", (req, res) => {
  res.send("🚀 Portfolio Contact Backend (Resend) is running!");
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // Create email content
    const htmlContent = `
      <h2>📩 New Message from Portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message).replace(
        /\n/g,
        "<br>"
      )}</p>
    `;

    // Send via Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM,
        to: [process.env.RESEND_TO],
        subject: `New message from ${name}`,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API Error:", data);
      return res.status(500).json({
        success: false,
        message: "Failed to send email via Resend.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully via Resend!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// Helper function to avoid XSS injection
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
