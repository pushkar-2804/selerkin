const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(compression());

// Routes
const emailRoutes = require("./routes/emailRoutes");
app.use("/api/emails", emailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
