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

    const payBooking = async (id) => {
        try{

            await API.put(`/bookings/${id}/pay`);

            setBookings(prev =>
                prev.map(b =>
                    b._id === id ? { ...b, paymentStatus: "paid"} : b
                )
            )
        } catch(err){
            console.log(err)
        }
    };

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
                            {booking.status === "on the way" && "🚗 On the Way"}
                            {booking.status === "completed" && "✅ Completed"}
                        </p>

                        <p className="payment">
                            payment: {booking.paymentStatus}
                        </p>

                        {booking.status === "accepted" && booking.paymentStatus === "unpaid" && (

                            <button
                            className="pay-btn"
                            onClick={() => payBooking(booking._id)}
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyBookings;