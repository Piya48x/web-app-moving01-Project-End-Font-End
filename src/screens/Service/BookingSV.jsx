import { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarSV from './NavbarSV';

function BookingSV() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // เรียกข้อมูลการจองเมื่อคอมโพเนนต์ถูกโหลด
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders');
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

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:3000/api/order/${orderId}`);
            // ลบคำสั่งที่ถูกลบออกจากสถานะ
            setOrders(orders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการลบคำสั่ง:', error);
        }
    };

    const handleDeleteLatestOrder = async () => {
        if (orders.length === 0) return;
        const latestOrderId = orders[0].id; // ถ้าใช้กำหนดให้คำสั่งที่ล่าสุดเป็นคำสั่งแรก
        handleDeleteOrder(latestOrderId);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">กำลังโหลด...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <>
            <NavbarSV />
            <div className="container mx-auto px-4 py-8 text-black">
                <h1 className="text-2xl font-bold mb-4">ประวัติการขนส่ง</h1>
                <button
                    onClick={handleDeleteLatestOrder}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    ลบคำสั่งล่าสุด
                </button>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">รหัสการจอง</th>
                                <th className="px-4 py-2">ประเภทรถ</th>
                                <th className="px-4 py-2">สถานะ</th>
                                <th className="px-4 py-2">สถานที่รับ</th>
                                <th className="px-4 py-2">สถานที่ส่ง</th>
                                <th className="px-4 py-2">วันที่และเวลา</th>
                                <th className="px-4 py-2">ระยะทางทั้งหมด (กม.)</th>
                                <th className="px-4 py-2">ค่าใช้จ่ายทั้งหมด (฿)</th>
                                <th className="px-4 py-2">การดำเนินการ</th> {/* เพิ่มหัวตารางนี้ */}
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
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            ลบ
                                        </button>
                                    </td> {/* เพิ่มเซลล์ในตารางนี้ */}
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
