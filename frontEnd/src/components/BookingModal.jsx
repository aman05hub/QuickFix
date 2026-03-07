import React, { useState } from "react";
import API from "../services/api"
import "../styles/BookingModal.css";

const BookingModal = ({ serviceId, closeModal }) => {

    const [date, setDate] = useState("")
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleBooking = async() => {

        if(!date || !time){
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

            setSuccess(true);

            setTimeout(()=>{
            closeModal();
            },2000);

        }catch(err){
            console.log(err);
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

                {success && <p className="success-msg">Booking Successful ✓</p>}

                <div className="modal-buttons">

                    <button className="confirm-btn" onClick={handleBooking}>{loading ? "Booking...":"Confirm Booking"}</button>

                    <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BookingModal;