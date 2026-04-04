import React, { useEffect, useState } from "react";
import API from "../services/api"

const Admin = () => {

    const [providers, setProviders] = useState([]);

    const fetchProviders = async () => {
        const { data } = await API.get("/admin/providers");
        setProviders(data);
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    const approve = async (id) => {
        await API.put(`/admin/approve/${id}`);
        fetchProviders();
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Admin Dashboard</h2>

            {providers.map(p => (
                <div key={p.id} style={{
                    background: "#1e293b",
                    padding: "15px",
                    margin: "10px",
                    borderRadius: "10px",
                    color: "white"
                }}>
                    <p>{p.name} ({p.serviceType})</p>
                    <p>Status: {p.isApproved ? "Approved" : "Pending"}</p>

                    {!p.isApproved && (
                        <button onClick={() => approve(p._id)}>
                            Approve
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Admin;