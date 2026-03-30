const express = require("express");
const router = express.Router();
const Message = require("../models/Message-model");
const { protect } = require("../middleware/auth-middleware");

//send message
router.post("/send", protect, async(req,res) => {
    try{

        const msg = await Message.create({
            booking: req.body.booking,
            sender: req.user._id,
            text: req.body.text
        });
        res.json(msg);
    } catch (err){
        res.status(500).json({ message: err.message })
    }
})

//get message
router.get("/:bookingId", protect, async (req, res) => {
    try{
        const msgs = await Message.find({ booking: req.params.bookingId })
        .populate("sender", "name");

        res.json(msgs);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;