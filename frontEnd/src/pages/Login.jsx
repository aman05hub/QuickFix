import React, { useState } from "react";
import API from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import "../styles/Auth.css"

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await API.post("/auth/login", form);

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("user", JSON.stringify(data.user));

            if(data.user.role === "provider"){
                navigate("/provider-dashboard");
            } else {
                navigate("/");
            }

        }catch(err){
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return(
        <div className="auth-container">

            <div className="auth-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <input
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    autoComplete="email" 
                    onChange={handleChange} 
                    />

                    <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    autoComplete="current-password" 
                    onChange={handleChange} 
                    />
                    
                    <button className="auth-btn">Login</button>
                </form>

                <p className="auth-link">
                    Don't have account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
