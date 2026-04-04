const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const authRouters = require("./routes/auth-route");
const { protect } = require("./middleware/auth-middleware");
const serviceRoutes = require("./routes/service-route");
const bookingRoutes = require("./routes/booking-route");
const userRoutes = require("./routes/user-route");
const paymentRoutes = require("./routes/payment-route");
const chatRoutes = require("./routes/chat-route");
const adminRoutes = require("./routes/admin-route");

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    core: {
        origin: "http://localhost:5173",
        methods:["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", (data) => {
        console.log("Message:", data);

        io.emit("receive_message", data); //broadcast to all
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    })
})

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

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

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