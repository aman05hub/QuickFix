import React, { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import "../styles/Profile.css";

const Profile = () => {

    const [user, setUser] = useState(() => {
        try{
            return JSON.parse(localStorage.getItem("user")) || {};
        } catch {
            return {};
        }
    }) 

    //form state
    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });

    //Image state
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    //Save progile DB + Navbar update
    const handleSave = async () => {
        try{
            const { data } = await API.put("/user/update-profile", form);

            //Save updated user
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);

            //Update Navbar
            window.dispatchEvent(new Event("storage"));

            toast.success("Profile updated successfully");
        } catch(err){
            toast.error("Update failed");
        }
    };

    const handleUpload = async () => {
        if (!image) return toast.error("Select image");;

        const formData = new FormData();
        formData.append("image", image);

        try{
            setLoading(true);

            const { data } = await API.post("/user/upload-profile", formData, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percent);
                }
            });

            localStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user);

            //Navbar update
            window.dispatchEvent(new Event("storage"));

            setPreview(null);
            toast.success("Profile Photo Updated");

        } catch (err) {
            toast.error("Upload Failed");

        } finally {
            setLoading(false);
            setProgress(0);

        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await API.delete("/user/delete-profile");

            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user)

            //Navbar update
            window.dispatchEvent(new Event("storage"));

            toast.success("Profile Photo Removed");

        } catch (err) {
            toast.error("Delete Failed");
        }
    }

    return(
        <div className="profile-page">

            <h2>👤 Profile</h2>

            {<p className="success-msg"></p>}

            <img 
                src={preview || user?.profilePic || "/default.png"}
                alt="profile"
                className="profile-page-img" 
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

            <button 
            onClick={handleUpload} 
            className="upload-btn" 
            disabled={loading}
            >
                {loading ? "Uploading..." : "Upload Photo"}
            </button>
            
            <button onClick={handleDelete} className="delete-btn">
                Delete Photo
            </button>

            {loading && <div className="loader"></div>}

            {loading && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%`}}>
                        {progress}%
                    </div>
                </div>
            )}

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