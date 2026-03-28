const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouters = require("./routes/auth-route");
const { protect } = require("./middleware/auth-middleware");
const serviceRoutes = require("./routes/service-route");
const bookingRoutes = require("./routes/booking-route");
const userRoutes = require("./routes/user-route");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouters)
app.use("/api/user", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.get("/",(req,res) => {
    res.send("Backend Running..")
})

app.get("/api/protected",protect,(req,res) => {
    res.json({
        message: "You accessed protected route", user: req.user
    });
});

app.listen(5000,() => {
    console.log("server is running")
})