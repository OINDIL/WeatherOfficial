// index.js (or your server file)

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/WeatherOfficial');

// Set up middleware, routes, and start the server
// Add your API routes here to handle data retrieval and storage

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
