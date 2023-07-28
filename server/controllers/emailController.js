const Email = require("../models/Email");
const nodemailer = require("nodemailer");

// Create the transporter
const transporter = nodemailer.createTransport({
  // Configure the transport settings for your email provider
  service: "gmail",
  auth: {
    user: "work.pushkarkhare@gmail.com",
    pass: "xievwnvmdxmpouev",
  },
});

const sendCustomizedEmail = async (req, res) => {
  try {
    const { email, name, product } = req.body;

    // Create the email object
    const customizedEmail = new Email(email, name, product);

    // Compose the email message
    const mailOptions = {
      from: "work.pushkarkhare@gmail.com",
      to: email,
      subject: `${product} Delivered!`,
      text: `Dear ${name},\n\nThank you for purchasing ${product}. We hope you enjoy it!\n\nBest regards,\nYour Company`,
    };

    // Send the email asynchronously
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send the email.");
  }
};

module.exports = {
  sendCustomizedEmail,
};
