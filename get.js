import mongoose from "mongoose";

// Define the blueprint for your booking
const bookingSchema = new mongoose.Schema({
    origin_city: { type: String, required: true },
    destination_city: { type: String, required: true },
    travel_date: Date,
    train_class: String,
    quota: String,
   
    createdAt: { type: Date, default: Date.now }
});

// Create the Model
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;