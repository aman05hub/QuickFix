const express = require("express");
const router = express.Router();
const { addService, getServices } = require("../controllers/service-controller");
const { protect, authorizeRoles } = require("../middleware/auth-middleware");

router.post("/add", protect, authorizeRoles("provider"), addService);
router.get("/",getServices);

module.exports = router;