const express = require("express");
const router = express.Router();
const User = require("../models/User-model");
const { protect, authorizeRoles } = require("../middleware/auth-middleware");
const Booking = require("../models/Booking-model");

//Get all provider
router.get("/providers", protect, authorizeRoles("admin"), async (req,res) => {
    const providers = await User.find({
        role: "provider"
    });
    res.json(providers);
});

//Approve provider
router.put("/approve/:id", protect, authorizeRoles("admin"), async (req,res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true }
    );
    res.json(user);
});

//Gat all payments
router.get("/payments", protect, authorizeRoles("admin"), async (req,res) => {
    const payment = await Booking.find({ paymentStatus: "paid "})
        .populate("user","name email")
        .populate("service");

    res.json(payments);
})

module.exports = router;