import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    userType: "customer", // เพิ่ม state สำหรับเก็บประเภทผู้ใช้
  });

  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeData = JSON.parse(localStorage.getItem("rememberMeData"));
    if (rememberMeData) {
      setFormData({
        ...formData,
        ...rememberMeData,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        formData
      );
      console.log(response.data);
      alert("เข้าสู่ระบบสำเร็จ");
      if (formData.rememberMe) {
        localStorage.setItem("rememberMeData", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberMeData");
      }
      // นำไปยังหน้าที่เหมาะสมตามประเภทผู้ใช้ที่เลือก
      if (formData.userType === "customer") {
        navigate("/CustomerComponent");
      } else if (formData.userType === "driver") {
        navigate("/DriverComponent");
      } else if (formData.userType === "admin") {
        navigate("/Booking");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาตรวจสอบข้อมูลการเข้าสู่ระบบของคุณ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="border border-gray-300 bg-white shadow-md rounded-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              เข้าสู่ระบบ
            </h2>
          </div>
           {/* เลือกประเภทผู้ใช้ */}
           <div className="mt-4">
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                เลือกประเภทผู้ใช้
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-black bg-indigo-100 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="customer">ลูกค้า</option>
                <option value="driver">คนขับรถ</option>
                {/* <option value="admin">ผู้ดูแลระบบ</option> */}
              </select>
            </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  อีเมล
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border-blue-600 placeholder-black-500 text-black rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-2"
                  placeholder="อีเมล"
                />
              </div>

              <div style={{ marginTop: "4px" }}>
                <label htmlFor="password" className="sr-only">
                  รหัสผ่าน
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 bg-white border-blue-600 placeholder-black-500 text-black rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-2"
                  placeholder="รหัสผ่าน"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  จดจำฉัน
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/ForgotPassword"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                เข้าสู่ระบบ
              </button>
            </div>
            <div className="text-sm">
              <h1 style={{ color: "black" }}>
                ยังไม่มีบัญชีผู้ใช้?{" "}
                <Link
                  to="/UI_Select"
                  className="underline font-medium text-indigo-600 hover:text-indigo-500"
                >
                  สมัครสมาชิก
                </Link>
              </h1>
            </div>

           
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
