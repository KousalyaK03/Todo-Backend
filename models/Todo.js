// models/Todo.js
const mongoose = require('mongoose');

// Define what a Todo looks like in the DB
const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Todo', TodoSchema);
