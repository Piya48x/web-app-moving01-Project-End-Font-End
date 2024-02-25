import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function FollowCustomer() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // ฟังก์ชันสำหรับส่งข้อความ
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', message);
      setMessage('');
      // เพิ่มข้อความที่ส่งไปยังรายการข้อความ
      setMessages([...messages, { text: message, sent: true }]);
    }
  };

  // เอฟเฟกต์เพื่อฟังก์ชันในการรับข้อความเข้ามา
  useEffect(() => {
    // ฟังก์ชันเมื่อได้รับเหตุการณ์ 'message' จากเซิร์ฟเวอร์
    const handleMessage = (message) => {
      // อัปเดตสถานะข้อความด้วยข้อความใหม่
      setMessages([...messages, { text: message, sent: false }]);
    };

    socket.on('message', handleMessage);

    // ทำความสะอาดการฟังก์ชัน
    return () => {
      socket.off('message', handleMessage);
    };
  }, [messages]);

  // เอฟเฟกต์เพื่อสไครล์ล์ไปที่ด้านล่างเมื่อได้รับข้อความใหม่
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">แชทกับลูกค้า</h1>
      <div className="flex flex-col space-y-2 overflow-y-auto" style={{ maxHeight: '70vh' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${msg.sent ? 'mr-4 bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-700 self-start'}`}
          >
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
          className="flex-grow border-gray-300 rounded-lg p-2"
          placeholder="พิมพ์ข้อความของคุณ..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          ส่ง
        </button>
      </div>
    </div>
  );
}

export default FollowCustomer;
