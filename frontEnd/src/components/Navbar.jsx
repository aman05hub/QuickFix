import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login")
    };

    return(
        <nav className="navbar">

            <div className="logo">QuickFix</div>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link to="/"> Home </Link>
                <Link to="/services">Services</Link>
                <Link to="/user-dashboard">Dashboard</Link>
                <Link to="/login">Login</Link>

                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>

            <div 
            className="menu-toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            >☰
            </div>
        </nav>
    );
};

export default Navbar;