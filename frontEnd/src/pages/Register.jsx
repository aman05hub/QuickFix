import { React, useState } from "react";
import API from "../services/api";
import { useNavigate,Link } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const setRole = (role)=>{
        setForm({...form,role});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post("/auth/register", form);
            alert("Registered successfully");
            navigate("/login");

        }catch(err){
            alert(err.response?.data?.message || "Registration failed")
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>

                    <input name="name" 
                    placeholder="Full Name" 
                    value={form.name}
                    onChange={handleChange} 
                    />

                    <input name="email"
                    type="email" 
                    placeholder="Email"
                    autoComplete="email" 
                    value={form.email}
                    onChange={handleChange} 
                    />

                    <input name="password" 
                    type="password" 
                    placeholder="Password"
                    autoComplete="new-password" 
                    value={form.password}
                    onChange={handleChange} 
                    />
                
                    <div className="role-select">

                        <button
                            type="button"
                            className={form.role==="user" ? "role-btn active":"role-btn"}
                            onClick={()=>setRole("user")}
                        >User
                        </button>

                        <button
                            type="button"
                            className={form.role==="provider" ? "role-btn active":"role-btn"}
                            onClick={()=>setRole("provider")}
                        >Provider
                        </button>
                    </div>

                    <button className="auth-btn">Create Account</button>
                </form>

                <p className="auth-link">
                    Already have account? <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    )
}

export default Register;