import React, { useState } from "react";
import "./Lobby.css";

const Lobby = ({ joinRoom, users = [] }) => { // Default to an empty array
    const [userName, setUserName] = useState(""); // State for the username

    // Handler for input changes
    const onChangeHandler = (e) => {
        setUserName(e.target.value); // Update username state
    };

    // Handler for form submission
    const onSubmitHandler = (e) => {
        e.preventDefault(); // Prevent default form submission
        const trimmedName = userName.trim(); // Trim whitespace

        // Validate the username
        if (trimmedName === "") {
            alert("Username cannot be empty or whitespace!"); // Alert if empty
            return;
        }
        if (users.find(user => user.name === trimmedName)) {
            alert("Username already taken!"); // Alert if username is taken
            return;
        }
        joinRoom(trimmedName); // Call joinRoom function with the username
    };

    // Render the lobby interface
    return (
        <div className="lobby">
            <span className="lobby_icon"></span>
            <h2 className="lobby_heading">Enter the conversation</h2>
            <form className="lobby_frm" onSubmit={onSubmitHandler}>
                <input
                    className="lobby_input"
                    type="text"
                    placeholder="Name"
                    onChange={onChangeHandler} // Set username on change
                />
                <button className="lobby_btn" type="submit" disabled={!userName}>
                    Join
                </button>
            </form>
        </div>
    );
};

export default Lobby;

