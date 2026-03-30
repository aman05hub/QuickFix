const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);