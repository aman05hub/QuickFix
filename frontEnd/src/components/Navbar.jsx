import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import "../styles/Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const token = localStorage.getItem("token")

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
                {/* Show only when logged in */}
                {token && <Link to="/my-bookings">My Bookings</Link>}

                {!token && (
                    <Link to = "/login">
                        <button className="login-btn">Login</button>
                    </Link>
                )}

                {token && (
                    <div className="user-menu">

                        <FaUserCircle
                        className="user-icon"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        />

                        {dropdownOpen && (
                            <div className="dropdown">
                                <Link to="/my-bookings">My Bookings</Link>

                                <button onClick={logout}>Logout</button>
                            </div>
                        )}

                    </div>
                )}
                
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