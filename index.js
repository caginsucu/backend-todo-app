const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

// api routes

const todoRoutes = require("./routes/todo");

// app config
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(logger());
app.options("*", cors());

// mongodb connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successfully"))
  .catch((err) => console.log(err));

// test
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Api is working! Say hello" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// routers here

app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running at http://localhost:${process.env.PORT}`);
});
