import React from "react";
import "./MessageItem.css";
import dayjs from "dayjs";

function MessageItem({ message, userColors }) {
    const userColor = userColors[message.from] || "black";
    const formattedTime = dayjs(message.sentAt).format("HH:mm");

    return (
        <li
            className={
                message.isIncoming
                    ? "messages-list_item"
                    : "messages-list_item messages-list_item--user-message"
            }
        >
            <div className="messages-list_item-content">
                <span className="messages-list_from" style={{ color: userColor }}>
                    {message.from}:
                </span>
                <span className="messages-list_text">{message.text}</span>
                <div className="messages-list_datetime">{formattedTime}</div>
            </div>
        </li>
    );
}


export default MessageItem;
