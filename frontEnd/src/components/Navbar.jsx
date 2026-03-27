import React, {useEffect , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import "../styles/Navbar.css";

const Navbar = () => {

    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
    });

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode);

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    }, [darkMode]);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login")
    };

    return(
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

            <div className="nav-container">

                
                <div className="logo">QuickFix</div>
                

                <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                    <button className="dark-btn"
                    onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <Link to="/"> Home </Link>

                    {role === "user" && (
                        <>
                            <Link to="/services">Services</Link>
                            <Link to="/my-bookings">My Bookings</Link>
                        </>
                    )}

                    {role === "provider" && (
                        <>
                            <Link to="/provider-dashboard">Dashboard</Link>
                            <Link to="/provider-dashboard">Jobs</Link>
                        </>
                    )}

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
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}

                        </div>
                    )}
                    
                </div>

                {/* Mobile menu */}
                <div 
                    className="menu-toggle" 
                    onClick={() => setMenuOpen(!menuOpen)}
                    >☰
                </div>
            </div>
        </nav>
    );
};

export default Navbar;