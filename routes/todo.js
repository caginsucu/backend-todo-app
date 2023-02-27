const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");

//get todos

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos: todos, status: 200, message: "Success" });
  } catch (error) {
    res.status(error.status).json({ message: error });
  }
});

// ad todo

router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
    });
    const savedTodo = await newTodo.save();

    res.status(201).json({ data: savedTodo, status: 201, message: "Success" });
  } catch (error) {
    res.status(error.status).json({ message: error });
  }
});

module.exports = router;
