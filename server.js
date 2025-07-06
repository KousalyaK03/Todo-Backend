// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config(); // Load variables from .env file
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Allows frontend (React) to talk to backend (Express)

// Routes
app.use('/api/todos', todoRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
