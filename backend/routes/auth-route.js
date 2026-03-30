const express = require("express");
const router = express.Router();
const { register,login } = require("../controllers/auth-controller");
const transporter = require("../config/mail")
const bcrypt = require("bcryptjs");
const User = require("../models/User-model")

router.post("/register", register);
router.post("/login", login);

router.post("/send-otp", async (req, res) => {
    try{
        const { email } = req.body;

        if(!email){
            return res.status(400).json({ message: "Email required" })
        }

        console.log("Email:",email);


        const otp = Math.floor(100000 + Math.random() * 900000).toString();

            console.log("OTP:",otp);

            await User.findOneAndUpdate(
                { email },
                {
                    otp,
                    otpExpire: Date.now() + 5 * 60 * 1000 //5 min
                },
                { upsert: true, new: true }
            );

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "QuickFix OTP Verifiction",
            text: `Your OTP is ${otp}`
        });

        res.json({ message: "OTP send successfully 📧"});

    } catch(err) {
        console.log("Error:", err.message);
        res.status(500).json({ message: err.message })
    }
})


router.post("/verify-otp", async(req, res) => {
    try{
        const { email, otp, name, password, role, serviceType } = req.body;
        const user = await User.findOne({ email });

        if(!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP ❌"});
        }

        if(user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "OTP expired ⏱️"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.name = name;
        user.password = hashedPassword;
        user.role = role;
        user.serviceType = role === "provider" ? serviceType : "";
        user.isVerified = true;

        // Clear OTP after use
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        res.json({ message: "Registered Successfully ✅"})
        
    } catch(err){
        console.log("Error", err.message)
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;