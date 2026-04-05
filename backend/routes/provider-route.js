const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking-model");
const { protect, authorizeRoles } = require("../middleware/auth-middleware");

// Provider earning
router.get("/earnings", protect, authorizeRoles("provider"), async (req, res) => {
    try{
        const bookings = await Booking.find({
            provider: req.user._id,
            paymentStatus: "paid"
        });

        //Total eraring
        const total = bookings.reduce((sum, b) => sum + b.prrice, 0 );

        //Monthly earing
        const monthly = {}

        bookings.forEach(b => {
            const month = new Date(b.createdAt).toLocaleString("default", { month: "short" });

            if(!monthly[month]) monthly[month] = 0;

            monthly[month] += b.price;
        });

        res.json({
            total,monthly
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;