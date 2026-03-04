import { React, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post("/auth/register", form);
            alert("Registered successfully");
            navigate("/login");

        }catch(err){
            console.log(err);

            if(err.response){
                console.log(err.response.data.message);
            } else {
               console.log("Server not responding")
            }
            
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>

                <input name="name" 
                placeholder="Name" 
                value={form.name}
                onChange={handleChange} 
                />

                <input name="email" 
                placeholder="Email" 
                value={form.email}
                onChange={handleChange} 
                />

                <input name="password" 
                type="password" 
                placeholder="Password" 
                value={form.password}
                onChange={handleChange} 
                />
            
                <select name="role" onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="provider">Provider</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;