import { useState } from "react";
import axios from "axios";

function RegisterDriver() {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
    confirmPassword: "",
    brand: "",
    colorCar: "",
    licensePlate: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    typeCar: "",
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
        "http://localhost:3000/api/register",
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
        brand: "",
        colorCar: "",
        licensePlate: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        typeCar: "",
      });
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลงทะเบียนคนขับรถ:", error);
    }
  };

  return (
    <div
      style={{ paddingTop: "30px", paddingBottom: "30px" }}
      className="flex justify-center items-center bg-gray-100"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        style={{ color: "black" }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          ลงทะเบียนสำหรับคนขับรถ
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="user">ผู้ใช้</label>
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
                className="input w-full bg-white  border-2  border-blue-600"
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
                className="input w-full bg-white   border-2 border-blue-600"
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
                className="input w-full bg-white    border-2 border-blue-600"
              />
            </div>
            <div>
    <label htmlFor="brand">ยี่ห้อรถ</label>
    <select
        id="brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        required
        className="input w-full bg-white border-2 border-blue-600"
    >
        <option value="">เลือกยี่ห้อรถ</option>
        <option value="Toyota">Toyota (โตโยต้า)</option>
        <option value="Honda">Honda (ฮอนด้า)</option>
        <option value="Nissan">Nissan (นิสสัน)</option>
        <option value="Mitsubishi">Mitsubishi (มิตซูบิชิ)</option>
        <option value="Isuzu">Isuzu (อีซูซุ)</option>
        <option value="Ford">Ford (ฟอร์ด)</option>
        <option value="Mazda">Mazda (มาสด้า)</option>
        <option value="Suzuki">Suzuki (ซูซูกิ)</option>
        <option value="Chevrolet">Chevrolet (เชฟโรเลต)</option>
        <option value="Mercedes-Benz">Mercedes-Benz (เมอร์เซเดส-เบนซ์)</option>
        <option value="BMW">BMW (บีเอ็มดับเบิลยู)</option>
        <option value="Audi">Audi (ออดี้)</option>
        <option value="Volvo">Volvo (โวลโว่)</option>
        <option value="Kia">Kia (เกีย)</option>
        <option value="Hyundai">Hyundai (ฮุนได)</option>
        <option value="Subaru">Subaru (ซูบารุ)</option>
        <option value="Peugeot">Peugeot (โพเชอร์)</option>
        <option value="Volkswagen">Volkswagen (โฟล์คสวาเกน)</option>
        <option value="Lexus">Lexus (เล็กซัส)</option>
        <option value="Mini">Mini (มินิ)</option>
        <option value="Other">อื่นๆ</option>
    </select>
    
    {/* เพิ่ม input text สำหรับระบุยี่ห้อรถเมื่อเลือก option อื่นๆ */}
    {formData.brand === "Other" && (
        <input
            type="text"
            id="otherBrand"
            name="otherBrand"
            value={formData.otherBrand}
            onChange={handleChange}
            placeholder="ระบุยี่ห้อรถ"
            className="mt-2 input w-full bg-white border-2 border-blue-600"
        />
    )}
</div>


<div>
    <label htmlFor="colorCar">สีรถ</label>
    <select
        id="colorCar"
        name="colorCar"
        value={formData.colorCar}
        onChange={handleChange}
        required
        className="input w-full bg-white border-2 border-blue-600"
    >
        <option value="">เลือกสีรถ</option>
        <option value="White">White (ขาว)</option>
        <option value="Black">Black (ดำ)</option>
        <option value="Gray">Gray (เทา)</option>
        <option value="Silver">Silver (เงิน)</option>
        <option value="Red">Red (แดง)</option>
        <option value="Blue">Blue (น้ำเงิน)</option>
        <option value="Green">Green (เขียว)</option>
        <option value="Yellow">Yellow (เหลือง)</option>
        <option value="Orange">Orange (ส้ม)</option>
        <option value="Brown">Brown (สีน้ำตาล)</option>
        <option value="Beige">Beige (เบจ)</option>
        <option value="Purple">Purple (ม่วง)</option>
        <option value="Pink">Pink (ชมพู)</option>
        <option value="Gold">Gold (ทอง)</option>
        <option value="Bronze">Bronze (เบรอนซ์)</option>
        {/* เพิ่มสีรถอื่นๆ */}
        <option value="Other">อื่นๆ</option>
    </select>
    {/* เพิ่ม input text สำหรับระบุสีรถเมื่อเลือก option อื่นๆ */}
    {formData.colorCar === "Other" && (
        <input
            type="text"
            id="otherColorCar"
            name="otherColorCar"
            value={formData.otherColorCar}
            onChange={handleChange}
            placeholder="ระบุสีรถ"
            className="mt-2 input w-full bg-white border-2 border-blue-600"
        />
    )}
</div>


            <div>
              <label htmlFor="licensePlate">เลขทะเบียนรถ</label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
                className="input w-full bg-white       border-2 border-blue-600"
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
                className="input w-full bg-white border-2 border-blue-600"
              />
            </div>
            <div>
              <label htmlFor="firstName">ชื่อ</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input w-full bg-white         border-2 border-blue-600"
              />
            </div>
            <div>
              <label htmlFor="lastName">นามสกุล</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input w-full bg-white        border-2 border-blue-600"
              />
            </div>
            <div>
              <label htmlFor="typeCar">ประเภทรถ</label>
              <select
                id="typeCar"
                name="typeCar"
                value={formData.typeCar}
                onChange={handleChange}
                required
                className="input w-full bg-white border-2 border-blue-600"
              >
                <option value="">เลือกประเภทรถ</option>
                <option value="Motorcycle">รถจักรยานยนต์</option>
                <option value="3-Wheeler">รถสามล้อ</option>
                <option value="Pickup Truck">รถกระบะ</option>
                <option value="6-Wheeler Truck">รถบรรทุก 6 ล้อ</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ลงทะเบียน
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDriver;
