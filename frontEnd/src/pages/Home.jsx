import React from "react";
import "../styles/Home.css"
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <div className="hero-text">
                    <h1>Book Trusted Local Services Instantly</h1>

                    <p>Find electricians, plumbers, cleaners and many more professional services near you. Fast booking and reliable providers.</p>

                    <div className="hero-buttons">
                        <Link to="/services">
                            <button className="primary-btn">Explore Services</button>
                        </Link>

                        <Link to="/register">
                            <button className="secondary-btn">Get Started</button>
                        </Link>
                    </div>
                </div>

                <div className="hero-image">

                    <svg viewBox="0 0 600 400">
                        <circle cx="300" cy="200" r="150" fill="#6366f1" opacity="0.2"/>
                        <rect x="230" y="150" width="140" height="120" rx="12" fill="#6366f1"/>
                        <circle cx="300" cy="200" r="40" fill="white"/>
                    </svg>

                </div>
            </div>
        </div>
    );
};

export default Home;