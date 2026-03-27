import React from "react";
import "../styles/Home.css"
import { Link } from "react-router-dom";
import { FaBolt, FaTools, FaBroom, FaSnowflake } from "react-icons/fa";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">

                <div className="container hero-content">

                <div className="hero-left">

                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search services (e.g. electrician, plumber)"
                    />
                    <button>Search</button>
                </div>

                        <h1>Book Trusted Local Services Instantly</h1>
                        <p className="hero-subtext">Find electricians, plumbers, cleaners and more near you.</p>

                        <div className="hero-buttons">
                            <Link to="/services" className="primary-btn">
                            Explore Services
                            </Link>

                            <Link to="/register" className="secondary-btn">
                            Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="hero-right">
                        <img src="/service.svg" alt="service" />
                    </div>

                </div>
            </section>

            <section className="services-section">
                <div className="container">

                    <h2>Our Services</h2>

                    <div className="services-grid">

                        <div className="service-box">
                            <FaBolt className="icon" />
                            <h3>Electrician</h3>
                            <p>Fan repair, wiring, switch fixing and more.</p>
                            <p className="rating">⭐⭐⭐⭐☆</p>
                        </div>

                        <div className="service-box">
                            <FaTools className="icon" />
                            <h3>Plumber</h3>
                            <p>Pipe leakage, tap repair, bathroom fittings.</p>
                            <p className="rating">⭐⭐⭐⭐☆</p>
                        </div>

                        <div className="service-box">
                            <FaBroom className="icon" />
                            <h3>Cleaning</h3>
                            <p>Home cleaning, kitchen cleaning, deep cleaning.</p>
                            <p className="rating">⭐⭐⭐⭐☆</p>
                        </div>

                        <div className="service-box">
                            <FaSnowflake className="icon" />
                            <h3>AC Service</h3>
                            <p>AC repair, gas refill, installation.</p>
                            <p className="rating">⭐⭐⭐⭐☆</p>
                        </div>

                    </div>
                </div>
            </section>

            <section className="how-section">
                <div className="container">

                    <h2>How It Works</h2>

                    <div className="steps">

                        <div>
                            <h3>1. Choose Service</h3>
                            <p>Select the service you need</p>
                        </div>

                        <div>
                            <h3>2. Book Slot</h3>
                            <p>Pick date & time</p>
                        </div>

                        <div>
                            <h3>3. Get Service</h3>
                            <p>Provider comes to your home</p>
                        </div>

                    </div>

                </div>
            </section>

            <section className="why-section">
                <div className="container">

                    <h2>Why Choose QuickFix</h2>

                    <div className="why-container">

                        <div>✔ Verified Professionals</div>
                        <div>✔ Affordable Pricing</div>
                        <div>✔ Fast Booking</div>
                        <div>✔ Trusted Service</div>

                    </div>
                </div>
            </section>

        </div>

    );
};

export default Home;