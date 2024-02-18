import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Booking() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch orders when the component mounts
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/orders');
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError('Error fetching orders. Please try again later.');
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h1>Orders</h1>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Date & Time</th>
              <th>Total Distance</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
  <tr key={order.id}>
    <td>{order.id}</td>
    <td>{order.vehicle}</td>
    <td>{order.bookingStatus}</td>
    <td>{order.pickupLocation ? order.pickupLocation.name : 'N/A'}</td> {/* Check if pickupLocation is not null */}
    <td>{order.dropoffLocation ? order.dropoffLocation.name : 'N/A'}</td> {/* Check if dropoffLocation is not null */}
    <td>{order.selectedDateTime}</td>
    <td>{order.totalDistance}</td>
    <td>{order.totalCost}</td>
  </tr>
))}

          </tbody>
        </table>
      </div>
    );
  }

export default Booking;
