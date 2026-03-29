const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const { protect } = require("../middleware/auth-middleware");
const { uploadProfilePic, deleteProfilePic } = require("../controllers/user-controller");

router.post("/upload-profile", protect, upload.single("image"), uploadProfilePic);
router.delete("/delete-profile", protect, deleteProfilePic);

module.exports = router;