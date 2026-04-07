const User = require("../models/User-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
async function register(req,res){
    try{
        const { name,email,password,role,serviceType,profession } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //Check exixting user
        const existingUser = await User.findOne({ email });

        if(existingUser)
            return res.status(400).json({ message: "User already exixts"});

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role,
            serviceType,
            profession: role === "provider" ? profession : null,
            isApproved: role === "provider" ? false : true,
        });

        res.status(201).json({
            message: "User Registered Successfully"
        });

    }catch(err){
        console.error(err)
        res.status(500).json({ error: err.message})
    }
};

async function login(req, res){

    try{
        const { email, password } = req.body;

        //check user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Email not found"});
        }

        if(user.role === "provider" && !user.isApproved){
            return res.status(403).json({
                success: false,
                message: "Wait for admin approval ⌛"
            })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Incorrect password"})
        }

        //Generate token
        const token = jwt.sign(
            { id: user._id , role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }catch(err){
        res.status(500).json({ message: err.message});
    }
}

module.exports = { 
    register,
    login
 };