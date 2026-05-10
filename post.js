import express from 'express';
import mongoose from 'mongoose';
import Booking from './get.js';
import cors from 'cors'
const app = express();


// Middleware
app.use(cors({
    origin: "*" // During testing, '*' allows all origins to prevent headaches
}));
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
const router = express.Router();

async function main() {
    await mongoose.connect("mongodb://localhost:27017/railway_booking");
    console.log("Connected to MongoDB - railway_booking database");
}

app.get('/', (req, res) => {
    res.send('Hello, Express Boilerplate!');
});

// POST endpoint to handle booking submissions
app.post('/api/booking', async (req, res) => {
    try {
        console.log('Received booking data:', req.body);
        const { origin_city, destination_city, travel_date, train_class, quota } = req.body;

        const booking = await Booking.create({
            origin_city,
            destination_city,
            travel_date,
            train_class,
            quota
        });

        console.log('Booking saved successfully:', booking);
        res.json({ success: true, message: 'Booking created successfully', data: booking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET endpoint to retrieve all bookings
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json({ success: true, data: bookings });
    } catch (error) {
        console.error('Error retrieving bookings:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});



app.use('/api', router);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;

main().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
});