import React, { useState } from "react";
import './SendMessage.css'
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function SendMessage({ sendMessage }) {
    const [message, setMessage] = useState("");

    const onChangeHandler = (e) => {
        setMessage(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
    };

    return (
        <form className="send-message" onSubmit={onSubmitHandler}>
            <input
                className="send-message_input"
                onChange={onChangeHandler}
                value={message}
                type="text"
                placeholder="Message Text"
            />
            <button className="send-message_icon" type="submit" disabled={!message}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </form>
    );
}

export default SendMessage;