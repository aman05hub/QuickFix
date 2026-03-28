import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Earnings.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Earnings = () => {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try{
            const { data } = await API.get("/bookings/provider");
            setBookings(data);
        } catch (err) {
            console.log(err);
        }
    };

    const filterBookings = () => {
        const now = new Date();

        return bookings.filter(b => {
            if(b.status !== "completed") return false;

            const bookingDate = new Date(b.date);

            if(filter === "today"){
                return bookingDate.toDateString() === now.toDateString();
            }

            if(filter === "week"){
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                return bookingDate >= weekAgo;
            }

            if(filter === "month"){
                return(
                    bookingDate.getMonth() === now.getMonth() &&
                    bookingDate.getFullYear() === now.getFullYear()
                );
            }

            return true;
        });
    }

    const total = filterBookings()
        .reduce((sum, b) => sum + (b.price || 0), 0);

    const monthlyData = filterBookings()
        .reduce((acc, b) => {
            const month = new Date(b.date).toLocaleString("default", { month: "short" });

            const exist = acc.find(item => item.month === month);

            if(exist){
                exist.earnings += b.price || 0;
            } else {
                acc.push({ month, earnings: b.price || 0});
            }

            return acc;
        }, []);

        return (
            <div className="earnings-page">
                <h1>💰 Earnings</h1>

                <div className="filter-buttons">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("today")}>Today</button>
                    <button onClick={() => setFilter("week")}>This Week</button>
                    <button onClick={() => setFilter("month")}>This Month</button>
                </div>

                <div className="earnings-card">
                    Total Earnings: ₹{total}
                </div>

                <div className="chart-box">
                    <h3>Monthly Earnings</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="earnings" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
};

export default Earnings;