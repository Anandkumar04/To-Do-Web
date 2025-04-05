const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Add a task
router.post("/", async (req, res) => {
  try {
    const newTask = new Task({ text: req.body.text });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle complete
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task text
router.put("/:id/update", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.text = req.body.text;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
