const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// ✅ Add Task to MongoDB
router.post("/add", async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.status(201).json({ message: "Task added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Tasks from MongoDB
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Task
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
