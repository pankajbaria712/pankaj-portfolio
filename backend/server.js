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
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
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
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 20px;
    max-width: 600px;
    margin: auto;
    color: #111827;
  ">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="color: #2563eb; margin: 0;">📩 New Message from Your Portfolio</h2>
      <p style="font-size: 14px; color: #6b7280;">Someone just reached out to you via your website!</p>
    </div>

    <div style="background-color: #ffffff; padding: 15px 20px; border-radius: 8px;">
      <p style="margin: 0 0 10px 0;"><strong>👤 Name:</strong> ${escapeHtml(
        name
      )}</p>
      <p style="margin: 0 0 10px 0;"><strong>📧 Email:</strong> ${escapeHtml(
        email
      )}</p>
      <p style="margin: 0;"><strong>💬 Message:</strong></p>
      <div style="margin-top: 8px; padding: 10px; background: #f3f4f6; border-radius: 6px;">
        ${escapeHtml(message).replace(/\n/g, "<br>")}
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; font-size: 13px; color: #6b7280;">
      <p>🚀 Sent automatically from your <strong>Portfolio Contact Form</strong></p>
      <a href="https://pankaj-portfolio-ivory.vercel.app" 
         style="color: #2563eb; text-decoration: none;">Visit Portfolio</a>
    </div>
  </div>
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
