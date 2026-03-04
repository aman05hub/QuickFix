import React,{ useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Services.css";

const Services = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const {data} = await API.get("/services");
                setServices(data)
            } catch (err) {
                console.log(err)
            }
        };

        fetchServices();
    }, [])
    return (
        <div className="services-page">
            <h1 className="title">Available Services</h1>

            <div className="services-grid">
                {services.map((service) => (
                    <div className="service-card" key={service._id}>
                        <div className="service-icon">🛠</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <p><b>₹{service.price}</b></p>

                        <button className="book-btn">Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;