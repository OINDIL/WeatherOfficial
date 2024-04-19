import express from 'express';
import axios from 'axios';
import cors from 'cors'

const app = express();
//http://api.weatherapi.com/v1/forecast.json?key=fdf5fddc24e847cda8671813242402&days=3&q=kolkata&aqi=yes
app.use(cors());
app.get('/weather', async (req, res) => {
    const { location } = req.query;

    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=fdf5fddc24e847cda8671813242402&days=3&q=${location}&aqi=yes`);
        res.json(response.data)
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})
app.use('/api/proxy', async (req, res) => {
    const { url } = req.query;

    try {
        // Make a request to the external API using the backend server as a proxy
        const response = await axios.get(url);

        // Send the response from the external API back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});