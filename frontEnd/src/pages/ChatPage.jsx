import { useEffect , useState } from "react";
import axios from "axios";
import "../styles/chat.css";

function ChatPage({ bookingId }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const res = await axios.get(`/api/chat/${bookingId}`);
        setMessages(res.data);
    };

    const sendMessage = async () => {
        if (!text) return;

        await axios.post("/api/chat",{
            bookingId,
            message: text,
        });

        setText("");
        fetchMessages();
    };

    return (
        <div className="chat-page">

            <div className="chat-header">
                <h3>Chat</h3>
            </div>

            <div className="chat-box">
                {messages.map((m) => (

                    <div 
                    key={m._id} 
                    className={
                        m.sender._id === localStorage.getItem("userId")
                        ? "message own" : "message"
                    }>
                        
                    </div>
                ))}
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
    );
}

export default ChatPage;