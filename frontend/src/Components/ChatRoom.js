import React, { useEffect, useRef, useState } from "react";
import "./ChatRoom.css";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserList from "./Users/UserList";
import MessageList from "./Messages/MessageList";
import SendMessage from "./Messages/SendMessage";

const ChatRoom = ({ users, messages, sendMessage, closeConnection }) => {
    const messageRef = useRef(null); // Reference to the message list for scrolling
    const [userColors, setUserColors] = useState({}); // Manage user colors

    // Scroll to the bottom of the message list on new message
    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0,
                top: scrollHeight - clientHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    // Assign a color to a user
    const handleUserColorAssign = (userName, color) => {
        setUserColors(prev => ({
            ...prev,
            [userName]: color // Store the color for each user by their name
        }));
    };

    // Render the chat room interface
    return (
        <div className="chat">
            <div className="chat_right">
                <div className="chat_right-header">
                    <span className="chat_heading">User List</span>
                    <div className="toolbar">
                        <span className="search-icon" onClick={closeConnection}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </span>
                    </div>
                </div>
                <div className="chat_right-main">
                    <UserList
                        users={users}
                        onUserColorAssign={handleUserColorAssign} // Pass function to assign user colors
                        assignedColors={userColors} // Pass down assigned colors
                    />
                </div>
            </div>
            <div className="chat_left">
                <div className="chat_left-header">
                    <span className="chat_heading">Message List</span>
                </div>
                <div className="chat_left-main" ref={messageRef}>
                    <MessageList messages={messages} userColors={userColors} />
                </div>
                <div className="chat_left-footer">
                    <SendMessage sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;