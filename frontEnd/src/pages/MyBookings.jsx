import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/MyBookings.css";

const MyBookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const fetchBookings = async () => {
            try{

                const { data } = await API.get("/bookings/my");

                setBookings(data);

            } catch(err){
                console.log(err);
            }
        }
        fetchBookings();

    }, []);
    return(
        <div className="bookings-page">
            <h1>My Bookings</h1>

            <div className="bookings-grid">

                {bookings.map((booking) => (

                    <div className="booking-card" key={booking._id}>
                        <h3>{booking.service.title}</h3>

                        <p>
                            <b>Date:</b> {booking.date}
                        </p>

                        <p>
                            <b>Time:</b> {booking.time}
                        </p>

                        <p className={`status ${booking.status}`}>
                            {booking.status === "pending" && "🟡 Pending"}
                            {booking.status === "accepted" && "🟢 Accepted"}
                            {booking.status === "rejected" && "🔴 Rejected"}
                            {booking.status === "completed" && "✅ Completed"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings;