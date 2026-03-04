const Service = require("../models/Service-model");

//Add service
async function addService(req,res) {
    try{
        const { title, description, price, category } = req.body;

        const service = await Service.create({
            title,
            description,
            price,
            category,
            provider: req.user._id
        });

        res.status(201).json(service);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

//Get all services
async function getServices(req, res){
    try{
        const services = await Service.find().populate("provider", "name email");
        res.json(services);
    }catch(err){
        res.status(500).json({ message: err.message })
    }
}

module.exports = { addService , getServices };