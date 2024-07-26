
require('dotenv').config();
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this line
const cookieParser = require("cookie-parser");
dotenv.config();
// const userRoutes = require("./routes/user.routes");
const chatRoutes = require("./routes/chat.routes");
const userRoutes = require("./routes/userRoutes")


// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

mongoose
  .connect(`mongodb://localhost:27017/cg`)
  .then(() => {
    console.log("MongoDB Connected!".bgMagenta);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB".bgRed + err);
  });



const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "CHATGPT SERVER OK" });
});

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`.bgCyan);
});
