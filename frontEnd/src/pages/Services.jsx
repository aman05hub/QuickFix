import React,{ useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Services.css";
import BookingModal from "../components/BookingModal";

const Services = () => {

    const [services, setServices] = useState([]);
    const [selectedService, setSelectService] = useState(null);

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

   

    const getIcon = (title) => {

        if(title.toLowerCase().includes("electric")){
            return(
                <svg viewBox="0 0 24 24">
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/>
                </svg>
            );
        }

        if(title.toLowerCase().includes("plumb")){
            return(
                <svg viewBox="0 0 24 24">
                    <path d="M21 7h-6V3h-2v4H3v2h10v4h2V9h6z"/>
                </svg>
            );
        }

        if(title.toLowerCase().includes("ac")){
            return(
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"/>
                </svg>
            );
        }

        if(title.toLowerCase().includes("clean")){
            return(
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"/>
                </svg>
            )
        }

        return "🛠";
    };

    return (
        <div className="services-page">
            <h1 className="title">Available Services</h1>

            <div className="services-grid">
                {services.map((service) => (
                    <div className="service-card" key={service._id}>
                        <div className="service-icon">
                            {getIcon(service.title)}
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                        <p><b>₹{service.price}</b></p>

                        <button className="book-btn" onClick={() => setSelectService(service._id)}>Book Now</button>

                    </div>
                ))}
            </div>
            {
                selectedService && ( 
                    <BookingModal 
                        serviceId={selectedService}
                        closeModal={() => setSelectService(null)}
                    />
                )
            }
        </div>
    );
};

export default Services;