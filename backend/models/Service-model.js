const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:String,
    price:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Service", serviceSchema);