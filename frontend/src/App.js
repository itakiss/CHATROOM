import './App.css';
import React, { useState } from "react";
import ChatRoom from "./Components/ChatRoom";
import Lobby from "./Components/Lobby";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const App = () => {
  // State variables for managing connection, messages, and users
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  // Function to join a chat room
  const joinRoom = async (userName) => {
    try {
      // Establish a connection to the SignalR server
      const connection = new HubConnectionBuilder()
          .withUrl("http://localhost:5039/chat") // URL of the SignalR hub
          .configureLogging(LogLevel.Information) // Configure logging level
          .build();

      // Listen for incoming messages
      connection.on("ReceiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Add new messages to state
      });

      // Listen for updates to the connected users list
      connection.on("ReceiveConnectedUsers", (users) => {
        setUsers(users); // Update the users state
      });

      // Handle connection closure
      connection.onclose(() => {
        setConnection(null); // Reset connection state
        setMessages([]); // Clear messages
        setUsers([]); // Clear users
      });

      // Start the connection and join the room
      await connection.start();
      await connection.invoke("JoinRoom", userName);
      setConnection(connection); // Set the connection in state
    } catch (e) {
      alert("Failed to connect to the chat server. Please try again later."); // Show error message
      console.error(e); // Log error details
    }
  };

  // Function to send a message
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message); // Send the message to the server
    } catch (e) {
      console.error(e); // Log any errors that occur
    }
  };

  // Function to close the connection
  const closeConnection = async () => {
    try {
      await connection.stop(); // Stop the SignalR connection
    } catch (e) {
      console.error(e); // Log any errors that occur
    }
  };

  // Render the application
  return (
      <div className="app">
        {!connection ? (
            <Lobby joinRoom={joinRoom} users={users} /> // Show lobby if not connected
        ) : (
            <ChatRoom
                users={users} // Pass connected users to ChatRoom
                messages={messages} // Pass messages to ChatRoom
                sendMessage={sendMessage} // Pass sendMessage function
                closeConnection={closeConnection} // Pass closeConnection function
            />
        )}
      </div>
  );
};

export default App;