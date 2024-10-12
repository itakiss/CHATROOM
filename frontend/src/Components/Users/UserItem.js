import React, { useEffect } from "react";
import "./UserItem.css";
import { colors } from './Colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function UserItem({ user, onUserColorAssign, assignedColors }) {
    // Generate a random color if the user doesn't have an assigned color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Assign the color when the component is mounted, but only if not assigned already
    useEffect(() => {
        if (!assignedColors[user.name]) { // Only assign if no color is assigned yet
            onUserColorAssign(user.name, randomColor); // Assign color for the user
        }
    }, [user.name, randomColor, assignedColors, onUserColorAssign]);

    return (
        <li className="users-list_item">
            <div className="users-list_img" style={{ backgroundColor: assignedColors[user.name] || randomColor }}>
                <FontAwesomeIcon icon={faUser} style={{ color: '#fff', fontSize: '24px' }} />
            </div>
            <div className="users-list_info">
                <div className="users-list_row">
                    <span className="users-list_name">{user.name}</span>
                </div>
                <div className="users-list_row">
                    <div className="users-list_recent-message">
                        <span className="users-list_message-text">{user.joinedAt}</span>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default UserItem;
