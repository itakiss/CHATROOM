import React from "react";
import "./MessageList.css";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, userColors }) => {
    return (
        <ul className="messages-list">
            {messages.map((message, idx) => (
                <MessageItem key={idx} message={message} userColors={userColors} />
            ))}
        </ul>
    );
};

export default MessageList;
