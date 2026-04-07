const express = require("express");
const router = express.Router();
const { addService, getServices } = require("../controllers/service-controller");
const { protect } = require("../middleware/auth-middleware");
const Service = require("../models/Service-model");

router.post("/add", protect, addService);
router.get("/",getServices);
router.get("/:id", async (req,res) => {
    const service = await Service.findById(req.params.id);
    res.json(service);
});

module.exports = router;