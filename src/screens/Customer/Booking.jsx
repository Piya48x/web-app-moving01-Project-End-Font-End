import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarCUS from './NavbarCUS';

function Booking() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // เรียกข้อมูลการจองเมื่อคอมโพเนนต์ถูกโหลด
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/bookings');
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการเรียกข้อมูลการจอง:', error);
                setError('เกิดข้อผิดพลาดในการเรียกข้อมูลการจอง โปรดลองอีกครั้งในภายหลัง');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDeleteLatest = async () => {
        try {
            const latestOrder = orders[orders.length - 1]; // รับข้อมูลการจองล่าสุด
            const orderId = latestOrder.id; // รับ ID ของการจองล่าสุด
            await axios.delete(`http://localhost:3000/api/booking/${orderId}`);
            // ลบข้อมูลการจองล่าสุดออกจาก state ท้องถิ่น
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลบการจองล่าสุด:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">กำลังโหลด...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <>
            <NavbarCUS />
            <div className="container mx-auto px-4 py-8 text-black">
                <h1 className="text-2xl font-bold mb-4">ประวัติการจอง</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">รหัสการจอง</th>
                                <th className="px-4 py-2">ยานพาหนะ</th>
                                <th className="px-4 py-2">สถานะ</th>
                                <th className="px-4 py-2">สถานที่รับ</th>
                                <th className="px-4 py-2">สถานที่ส่ง</th>
                                <th className="px-4 py-2">วันที่และเวลา</th>
                                <th className="px-4 py-2">ระยะทางทั้งหมด (กม.)</th>
                                <th className="px-4 py-2">ค่าใช้จ่ายทั้งหมด (บาท)</th>
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
                <div className="mt-4">
                    <button onClick={handleDeleteLatest} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        ลบการจองล่าสุด
                    </button>
                </div>
            </div>
        </>
    );
}

export default Booking;
