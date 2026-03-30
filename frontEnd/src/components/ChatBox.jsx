import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ChatBox.css";

const ChatBox = ({ bookingId }) => {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const fetchMessages = async () => {
        const { data } = await API.get(`/chat/${bookingId}`);
        console.log("Messages:", data)
        setMessages(data);
    };

    useEffect(() => {
        fetchMessages();

        const interval = setInterval(() => {
            fetchMessages();
        }, 3000);

        return () => clearInterval(interval)

    }, []);

    const sendMessage = async () => {
        if (!text) return;

        await API.post("/chat/send", {
            booking: bookingId,
            text
        });

        setText("");
        fetchMessages();
    };

    return (
        <div className="chat-box">

            <div className="chat-messages">
                {messages.map((msg) => {

                    const user = JSON.parse(localStorage.getItem("user"));
                    const isMe = msg.sender._id === user._id;

                    return(
                        <div
                            key={msg._id}
                            className={isMe ? "my-msg" : "other-msg"}
                        >
                            {msg.text}
                        </div>
                    )
                })}
            </div>

            <div className="chat-input">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type message..."
                />

                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox;