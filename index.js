const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 3,
  statusCode: 429,
  message: {
    status: 429,
    error: "Too many requests. Please try again in 10 minutes.",
  },
});
app.use(limiter), app.set("trust proxy", 1);

app.use(express.static("public"));

//Routes
app.use("/api", require("./routes"));

//Enable cors
app.use(cors);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
