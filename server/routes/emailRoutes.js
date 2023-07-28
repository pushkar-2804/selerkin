const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// Middleware to validate the input data
const validateData = (req, res, next) => {
  const { email, name, product } = req.body;
  if (!email || !name || !product) {
    return res.status(400).send("Missing required fields.");
  }
  next();
};

// Route to send a customized email
router.post("/", validateData, emailController.sendCustomizedEmail);

module.exports = router;
