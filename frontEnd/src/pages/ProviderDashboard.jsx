import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ProviderDashboard.css"

const ProviderDashboard = () => {

    const [bookings,setBookings] = useState([]);

    const pendingCount = bookings.filter(b => b.status === "pending").length;
    const acceptedCount = bookings.filter(b => b.status === "accepted").length;
    const completedCount = bookings.filter(b => b.status === "completed").length;

    useEffect(() => {

        const fetchBookings = async()=>{

            try{
                const {data} = await API.get("/bookings/provider");
                setBookings(data);
            }catch(err){
                console.log(err);
            }
        };
        fetchBookings();
    },[]);

    const updateStatus = async(id,status)=>{

        try{
            const {data} = await API.put(`/bookings/${id}/status`,{
                status
            });

            setBookings(prev => 
                prev.map(b =>
                    b._id === id ? {...b, status} : b
                )
            );
        } catch(err){
            console.log(err);
        }
    };

    return(
        <div className="provider-page">
            <h1>Provider Dashboard</h1>

            <div className="dashboard-summary">

                <div className="summary-card pending">
                    🟡 Pending: {pendingCount}
                </div>

                <div className="summary-card accepted">
                    🟢 Accepted: {acceptedCount}
                </div>

                <div className="summary-card completed">
                    ✅ Completed: {completedCount}
                </div>

            </div>

            <div className="provider-grid">
                {bookings.map(booking => (
                    <div className="provider-card" key={booking._id}>
                        <h3>{booking.service.title}</h3>

                        <p><b>Customer:</b>{booking.user.name}</p>

                        <p><b>Date:</b>{booking.date}</p>

                        <p><b>Time:</b>{booking.time}</p>

                        <p><b>Address:</b>{booking.address}</p>

                        <p><b>Phone:</b>{booking.phone}</p>

                        <p className={`status ${booking.status}`}>
                            {booking.status}
                        </p>

                        {booking.status === "pending" && (
                            <div className="action-buttons">

                                {booking.status === "pending" && (
                                    <>

                                    <button 
                                    className="accept-btn"
                                    onClick={() => updateStatus(booking._id,"accepted")}
                                    >
                                        Accept
                                    </button>

                                    <button 
                                    className="reject-btn"
                                    onClick={() => updateStatus(booking._id,"rejected")}
                                    >
                                        Reject
                                    </button>

                                    </>
                                )}

                                {booking.status === "accepted" && booking.paymentStatus === "paid" && (
                                    <button 
                                    className="ontheway-btn"
                                    onClick={() => updateStatus(booking._id,"on the way")}
                                    >
                                        On The Way
                                    </button>
                                )}

                                {booking.status === "on the way" && (
                                    <button className="complete-btn"
                                    onClick={() => updateStatus(booking._id,"completed")}
                                    >
                                        Completed
                                    </button>
                                )}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProviderDashboard;