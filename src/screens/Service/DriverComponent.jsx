import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const DriverComponent = () => {
  const [newOrder, setNewOrder] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    // Event listener for receiving newOrder event from server
    socket.on('newOrder', (order) => {
      setNewOrder(order); // Update newOrder state with received order
    });

    // Cleanup function to remove event listener
    return () => {
      socket.off('newOrder');
    };
  }, []);

  const handleConfirmOrder = () => {
    setConfirmedOrder(newOrder); // Set confirmedOrder state with newOrder
  };

  return (
    <div>
      <h2>New Order Received</h2>
      {newOrder && (
        <div>
          {!confirmedOrder && (
            <button onClick={handleConfirmOrder}>Confirm Order</button>
          )}
        </div>
      )}
      {confirmedOrder && (
        <div>
          <h3>Confirmed Order</h3>
          <p>Pickup Location: {confirmedOrder.pickupLocation}</p>
          <p>Destination: {confirmedOrder.destination}</p>
          <p>Selected Vehicle: {confirmedOrder.selectedVehicle}</p>
        </div>
      )}
    </div>
  );
};

export default DriverComponent;
