import React from "react";
import UserItem from "./UserItem";

const UserList = ({ users, onUserColorAssign, assignedColors }) => {
    return (
        <ul className="users-list">
            {users.map((user, idx) => (
                <UserItem
                    key={idx}
                    user={user}
                    onUserColorAssign={onUserColorAssign}
                    assignedColors={assignedColors} // Pass down assigned colors
                />
            ))}
        </ul>
    );
};

export default UserList;
