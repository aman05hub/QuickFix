import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        socket.emit("send_message", msg);
        setMsg("");
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    return(
        <div>
            <h2>Chat</h2>

            {messages.map((m, i) => (
                <p key={i}>{m}</p>
            ))}

            <input value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chat;