/* eslint-disable no-unused-vars */
// CustomerComponent.jsx

import { useState, useEffect } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const CustomerComponent = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleOrder = async () => {
    const orderData = {
      pickupLocation,
      destination,
      selectedVehicle,
    };

    try {
      const response = await fetch("http://localhost:3000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
      alert("Order placed successfully");
      setPickupLocation("");
      setDestination("");
      setSelectedVehicle("");

      // Send 'orderReceived' event to server
      socket.emit("orderReceived");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  return (
    <div>
      <h2>Customer Component</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <select
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        <option value="Car">Car</option>
        <option value="Truck">Truck</option>
        <option value="Motorcycle">Motorcycle</option>
      </select>
      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default CustomerComponent;
