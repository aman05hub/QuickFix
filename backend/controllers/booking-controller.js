const Booking = require("../models/Booking-model");
const Service = require("../models/Service-model");

async function createBooking(req,res){
    try{
        const { serviceId, date, time } = req.body;

        const service = await Service.findById(serviceId);

        if(!service){
            return res.status(400).json({ message: "Service not found "});
        }

        const booking = await Booking.create({
            user: req.user._id,
            service: service.id,
            provider: service.provider,
            date,
            time
        });

        res.status(201).json(booking);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

//Get
async function getMyBookings(req,res){
    try{
        const bookings = await Booking.find({ user: req.user._id })
        .populate("service")
        .populate("provider", "name email");

        res.json(bookings);
    } catch (err){
        res.status(500).json({ message: err.message})
    }
}

//Get provider booking
async function getProviderBookings(req,res){
    try{
        const bookings = await Booking.find({ provider: req.user._id })
        .populate("user","name email")
        .populate("service");

        res.json(bookings);

    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

async function updateBookingStatus(req,res){
    try{
        const { id } = req.params;
        const { status } = req.body;

        const booking = await Booking.findById(id);

        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = status;
        await booking.save();

        res.json(booking);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

async function payBooking(req, res){
    try{

        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.paymentStatus = "paid"

        await booking.save();

        res.json(booking);

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = { 
    createBooking, 
    getMyBookings, 
    getProviderBookings,
    updateBookingStatus,
    payBooking
 };