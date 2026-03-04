import React, {useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login")
    };

    return(
        <nav className="navbar">

            <div className="logo">QuickFix</div>

            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link to="/" className={location.pathname === "/" ? "active" : ""}> Home </Link>
                <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>Services</Link>
                <Link to="/my-bookings" className={location.pathname === "/my-bookings" ? "active" : ""}>My Bookings</Link>
                {/* <Link to="/login">Login</Link> */}

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