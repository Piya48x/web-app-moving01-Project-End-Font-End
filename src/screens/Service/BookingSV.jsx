import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarSV from './NavbarSV';


function BookingSV() {
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

    const handleDeleteLatest = async () => {
        try {
            const latestOrder = orders[orders.length - 1]; // Get the latest order
            const orderId = latestOrder.id; // Get the ID of the latest order
            await axios.delete(`http://localhost:3000/api/booking/${orderId}`);
            // Remove the latest order from the local state
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting latest order:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <>
            <NavbarSV />
            <div className="container mx-auto px-4 py-8 text-black">
                <h1 className="text-2xl font-bold mb-4">History Order</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Order ID</th>
                                <th className="px-4 py-2">Vehicle</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Pickup Location</th>
                                <th className="px-4 py-2">Dropoff Location</th>
                                <th className="px-4 py-2">Date & Time</th>
                                <th className="px-4 py-2">Total Distance (km)</th>
                                <th className="px-4 py-2">Total Cost (Baht)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{order.id}</td>
                                    <td className="px-4 py-2">{order.vehicle}</td>
                                    <td className="px-4 py-2">{order.bookingStatus}</td>
                                    <td className="px-4 py-2">{order.pickupLocation ? order.pickupLocation.name : 'N/A'}</td>
                                    <td className="px-4 py-2">{order.dropoffLocation ? order.dropoffLocation.name : 'N/A'}</td>
                                    <td className="px-4 py-2">{order.selectedDateTime}</td>
                                    <td className="px-4 py-2">{order.totalDistance}</td>
                                    <td className="px-4 py-2">{order.totalCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BookingSV;
