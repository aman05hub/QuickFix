import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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

            if(data.user.role == "provider"){
                navigate("/provider-dashboard");
            } else {
                navigate("/user-dashboard");
            }

        }catch(err){
            alert(err.response.data.message);
        }
    };

    return(
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <input 
                name="email" 
                placeholder="Email" 
                value={form.email}
                onChange={handleChange} 
                />

                <input 
                name="password" 
                type="password" 
                placeholder="Password" 
                value={form.password}
                onChange={handleChange} 
                />
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;