import React, { useState } from "react";
import API from "../services/api";

const AddService = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: ""
    });

    const [message, setMessage] = useState("");
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const handleSubmit = async () => {
        try {
            await API.post("/services/add", form);

            setMessage("Service Added successfully ✅");

            setForm({ title:"", description:"",price:""})

        } catch (err){
            setMessage("Error while adding service ❌")
        }
    };

    return(
        <div>
            
        </div>
    )
}