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
            from: `"QuickFix" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "QuickFix OTP Verifiction",
            html: `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; text-align: center;">
            
            <h2 style="color: #333;"><img style="align-item:center;" src="https://ik.imagekit.io/nuavc0dai/service.svg" width="150" /> </h2>
            
            <h3 style="color: #444;">OTP Verification</h3>
            
            <p style="color: #666;">Use the OTP below to complete your registration:</p>
            
            <div style="font-size: 28px; font-weight: bold; color: #2d89ef; margin: 20px 0;">
                ${otp}
            </div>
            
            <p style="color: #999;">This OTP is valid for 5 minutes ⏱️</p>
            
            <hr style="margin: 20px 0;">
            
            <p style="font-size: 12px; color: #aaa;">
                If you did not request this, please ignore this email.
            </p>
        </div>
    </div>
    `
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

        if(!user || user.otp !== String(otp).trim()) {
            return res.status(400).json({ message: "Invalid OTP ❌"});
        }

        if(user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "OTP expired ⏱️"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.name = name;
        user.password = hashedPassword;
        if (role === "provider") {
            user.isApproved = false;
        } else {
            user.isApproved = true;
        }
        
        if (role === "provider"){
            user.serviceType = serviceType;
        }
        
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