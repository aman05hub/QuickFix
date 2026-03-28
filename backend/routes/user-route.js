const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { protect } = require("../middleware/auth-middleware");
const uploadProfilePic = require("../controllers/user-controller");

router.post("/upload-profile", protect, upload.single("image"), uploadProfilePic);

module.exports = router;