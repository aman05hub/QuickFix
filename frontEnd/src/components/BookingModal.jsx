import React, { useState } from "react";
import API from "../services/api"
import "../styles/BookingModal.css";

const BookingModal = ({ serviceId, closeModal }) => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBooking = async() => {

        if(!date || !time){
            alert("Please select date and time");
            return;
        }

        try{
            setLoading(true)

            const bookingDate = {
                serviceId,
                date,
                time
            };

            await API.post("/bookings/create", bookingDate);

            alert("Booking Successfull");
            closeModal();

        }catch(err){
            console.log(err);
            alert("Booking failed")
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Book Service</h2>
                <label> Select Date</label>

                <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />

                <label>Select Time</label>

                <input type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)} 
                />

                <div className="modal-buttons">

                    <button className="confirm-btn" onClick={handleBooking}>{loading ? "Booking...":"Confirm Booking"}</button>

                    <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;