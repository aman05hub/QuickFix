const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings, getProviderBookings, updateBookingStatus, payBooking, createBookingAfterPayment } = require("../controllers/booking-controller");
const { protect, authorizeRoles } = require("../middleware/auth-middleware");

//Only user can create booking
router.post("/create", protect, authorizeRoles("user"), createBooking );

//get user booking
router.get("/my", protect, authorizeRoles("user"), getMyBookings);

//provider get their booking
router.get("/provider", protect, authorizeRoles("provider"), getProviderBookings);

//provider update there booking
router.put("/:id/status", protect, authorizeRoles("provider"), updateBookingStatus);

//User pays for booking
router.put("/:id/pay",protect, authorizeRoles("user"), payBooking)

router.post("/after-payment", protect, createBookingAfterPayment);

module.exports = router;