const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// ✅ CREATE: Add a new todo
router.post('/add', async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err });
  }
});

// ✅ READ: Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err });
  }
});

// 🔁 UPDATE: Edit or mark todo as completed
// routes/todoRoutes.js (update route)
// Update todo text and completed status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;  // completed can be true/false

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    res.json({ message: 'Todo updated', todo: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo', error: err });
  }
});



// ❌ DELETE: Remove a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err });
  }
});

module.exports = router;
