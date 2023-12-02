import React, { useEffect, useRef, useState } from "react";
import { BASE_USER } from "../../constants";

const Message = ({ content, maxLength = 250 }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // const truncatedContent = expanded ? content : content.slice(0, maxLength);

    return (
        <>
            <p>{content}</p>
            {/* {content.length > maxLength && (
                <button className="read-btn" onClick={toggleExpanded}>
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )} */}
        </>
    );
};

function ChatContainer({ messages }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages change
        scrollToBottom();
    }, [messages]);


    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-container" ref={containerRef}>
            {messages.map((message, index) => (
                <div key={index} className={message.receiver === BASE_USER ? "recieved-msg" : "sent-msg"}>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
}

export default ChatContainer;