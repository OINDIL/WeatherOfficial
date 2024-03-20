// schema.js

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/WeatherOfficial');

// Define schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: false,
  },
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
