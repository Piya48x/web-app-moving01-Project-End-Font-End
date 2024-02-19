import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import classNames from "classnames";

const socket = io("http://localhost:3000");

function FollowDriverComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [order, setOrder] = useState(null);

  // Effect to listen for new orders
  useEffect(() => {
    // Event listener when receiving 'newOrder' event from the server
    const handleNewOrder = (newOrder) => {
      // Update order state with the new order
      setOrder(newOrder);
    };

    socket.on("newOrder1", handleNewOrder);

    // Clean up socket listener
    return () => {
      socket.off("newOrder1", handleNewOrder);
    };
  }, []);

  // Function to send message
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      // Add the sent message to the list of messages
      setMessages([...messages, { text: message, sent: true }]);
      setMessage("");
    }
  };

  // Effect to listen for incoming messages
  useEffect(() => {
    // Event listener when receiving 'message' event from the server
    const handleMessage = (message) => {
      // Update messages state with the new message
      setMessages([...messages, { text: message, sent: false }]);
    };

    socket.on("message", handleMessage);

    // Clean up socket listener
    return () => {
      socket.off("message", handleMessage);
    };
  }, [messages]); // Include messages in the dependency array

  // Scroll to bottom when new message is received
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {order ? (
        <div className="mt-8 container mx-auto p-4">
          <div className="border border-gray-300 p-4 mb-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p className="mb-2">Vehicle: {order.vehicle}</p>
            <p className="mb-2">Booking Status: {order.bookingStatus}</p>
            {order.pickupLocation && (
              <p className="mb-2">Pickup Location: {order.pickupLocation.name}</p>
            )}
            {order.dropoffLocation && (
              <p className="mb-2">Drop-off Location: {order.dropoffLocation.name}</p>
            )}
            <p className="mb-2">Selected DateTime: {order.selectedDateTime}</p>
            <p className="mb-2">Total Distance: {order.totalDistance} km</p>
            <p className="mb-2">Total Cost: {order.totalCost} Baht</p>
          </div>

          <h1 className="text-2xl font-bold mb-4">Chat Customer</h1>
          <div className="flex flex-col space-y-2 overflow-y-auto bg-gray-100 p-4 rounded-lg" style={{ maxHeight: "70vh" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-lg ${msg.sent ? "mr-4 bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-700 self-start"}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow border-blue-500 rounded-lg p-2 text-white"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-800 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FollowDriverComponent;
