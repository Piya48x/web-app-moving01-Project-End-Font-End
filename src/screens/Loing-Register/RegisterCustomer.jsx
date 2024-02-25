import { useState } from "react";
import axios from "axios";

function RegisterCustomer() {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register-customer",
        formData
      );
      alert("ลงทะเบียนเสร็จเรียบร้อย")
      console.log(response.data);
      // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
      setFormData({
        user: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลงทะเบียนลูกค้า:", error);
    }
  };

  return (
    <div
      style={{ paddingTop: "30px", paddingBottom: "30px", color: "black" }}
      className="flex justify-center items-center bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          ลงทะเบียนสำหรับลูกค้า
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user">ชื่อ-นามสกุล</label>
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
              className="input w-full bg-white border-2 border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="email">อีเมล</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input w-full bg-white border-2 border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input w-full bg-white border-2 border-blue-600"
            /><p style={{fontSize: '12px'}} >รหัสต้องใส่อย่างน้อย 8-10 ตัว</p>
          </div>
          <div>
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input w-full bg-white border-2  border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">หมายเลขโทรศัพท์</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="input w-full bg-white  border-2  border-blue-600"
            />
          </div>
          <div>
            <label htmlFor="address">ที่อยู่</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input w-full bg-white border-2 border-blue-600" 
            />
          </div>
          <button type="submit" className="btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            ลงทะเบียน
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCustomer;
