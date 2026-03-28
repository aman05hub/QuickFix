import React, { useState } from "react";
import API from "../services/api";
import "../styles/Profile.css";

const Profile = () => {

    const [user, setUser] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    }) 

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });

    console.log(localStorage.getItem("user"))

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSave = () => {
        const updatedUser = {...user, ...form};

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        setMessage("Profile Updated Successfully");
        setTimeout(() => setMessage(""), 3000);
    };

    const handleUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        try{
            setLoading(true);

            const { data } = await API.post("/user/upload-profile", formData);

            localStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user);

            setPreview(null);

            setMessage("Profile Photo Updated");
            setTimeout(() => setMessage(""), 3000);

        } catch (err) {
            setMessage("Upload Failed");
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="profile-page">

            <h2>👤 Profile</h2>

            {message && <p className="success-msg">{message}</p>}

            <img 
                src={preview || user?.profilePic || "/default.png"}
                alt="profile"
                className="profile-img" 
            />

            <br /><br />

            <input 
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);

                    if(file){
                        setPreview(URL.createObjectURL(file));
                    }
                }}
            />

            <br /><br />

            <button onClick={handleUpload} className="upload-btn" disabled={loading}>
                {loading ? "Uploading..." : "Upload Photo"}
            </button>
            {loading && <div className="loader"></div>}

            <hr style={{ margin: "30px 0"}} />

            <input 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name" 
            />

            <br /><br />

            <input 
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
            />
            
            <br /><br />

            <button onClick={handleSave} className="save-btn">Save Changes</button>

        </div>
    )
}

export default Profile;