const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");

const authRouters = require("./routes/auth-route");
const { protect } = require("./middleware/auth-middleware");
const serviceRoutes = require("./routes/service-route");
const bookingRoutes = require("./routes/booking-route");
const userRoutes = require("./routes/user-route");
const paymentRoutes = require("./routes/payment-route");
const chatRoutes = require("./routes/chat-route");
const adminRoutes = require("./routes/admin-route");
const providerRoutes = require("./routes/provider-route");
const setupSocket = require("./socket/socket");

dotenv.config();

const app = express();

const server = http.createServer(app);

setupSocket(server);


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRouters)
app.use("/api/user", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes)
app.use("/api/payment", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/provider", providerRoutes);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.log(err));

app.get("/",(req,res) => {
    res.send("Backend Running..")
})

app.get("/api/protected",protect,(req,res) => {
    res.json({
        message: "You accessed protected route", 
        user: req.user
    });
});

server.listen(5000, () => {
    console.log("Server is running on port 5000")
})