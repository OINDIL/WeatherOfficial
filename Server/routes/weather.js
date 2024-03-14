// routes/weather.js

const express = require('express');
const router = express.Router();
const Weather = require('../models/weatherModel'); // Define a Mongoose model for weather data

// Define routes to handle CRUD operations for weather data
// Example: Get all weather data
router.get('/', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add more routes for storing, updating, and deleting weather data

module.exports = router;
