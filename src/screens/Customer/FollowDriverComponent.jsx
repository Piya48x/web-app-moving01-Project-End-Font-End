import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import classNames from "classnames";

const socket = io("http://localhost:3000");

function FollowDriverComponent() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [order, setOrder] = useState(null);

  // เอฟเฟกต์เพื่อฟังก์ชันในการรับคำสั่งใหม่
  useEffect(() => {
    // ฟังก์ชันเมื่อได้รับเหตุการณ์ 'newOrder' จากเซิร์ฟเวอร์
    const handleNewOrder = (newOrder) => {
      // อัปเดตสถานะคำสั่งด้วยคำสั่งใหม่
      setOrder(newOrder);
    };

    socket.on("newOrder1", handleNewOrder);

    // ทำความสะอาดการฟังก์ชัน
    return () => {
      socket.off("newOrder1", handleNewOrder);
    };
  }, []);

  // ฟังก์ชันสำหรับส่งข้อความ
  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      // เพิ่มข้อความที่ส่งไปยังรายการข้อความ
      setMessages([...messages, { text: message, sent: true }]);
      setMessage("");
    }
  };

  // เอฟเฟกต์เพื่อฟังก์ชันในการรับข้อความเข้ามา
  useEffect(() => {
    // ฟังก์ชันเมื่อได้รับเหตุการณ์ 'message' จากเซิร์ฟเวอร์
    const handleMessage = (message) => {
      // อัปเดตสถานะข้อความด้วยข้อความใหม่
      setMessages([...messages, { text: message, sent: false }]);
    };

    socket.on("message", handleMessage);

    // ทำความสะอาดการฟังก์ชัน
    return () => {
      socket.off("message", handleMessage);
    };
  }, [messages]); // รวม messages ในอาร์เรย์ของขึ้นต่อ

  // สไครล์ลล์ไปที่ด้านล่างเมื่อได้รับข้อความใหม่
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {order ? (
        <div className="mt-8 container mx-auto p-4">
          <div className="border border-gray-300 p-4 mb-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">รายละเอียดคำสั่ง</h2>
            <p className="mb-2">ยานพาหนะ: {order.vehicle}</p>
            <p className="mb-2">สถานะการจอง: {order.bookingStatus}</p>
            {order.pickupLocation && (
              <p className="mb-2">สถานที่รับสินค้า: {order.pickupLocation.name}</p>
            )}
            {order.dropoffLocation && (
              <p className="mb-2">สถานที่ส่งสินค้า: {order.dropoffLocation.name}</p>
            )}
            {/* <p className="mb-2">เวลาที่เลือก: {order.selectedDateTime}</p> */}
            <p className="mb-2">ระยะทางทั้งหมด: {order.totalDistance} กิโลเมตร</p>
            <p className="mb-2">ราคาทั้งหมด: {order.totalCost} บาท</p>
          </div>

          <h1 className="text-2xl font-bold mb-4">แชทกับคนขับ</h1>
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
              placeholder="พิมพ์ข้อความของคุณ..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-800 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
            >
              ส่ง
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FollowDriverComponent;
