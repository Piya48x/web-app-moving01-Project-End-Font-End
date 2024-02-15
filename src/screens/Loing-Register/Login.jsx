/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false, // เพิ่ม state สำหรับการจำข้อมูลการเข้าสู่ระบบ
  });

  const navigate = useNavigate();

  useEffect(() => {
    // เมื่อ component โหลด จะตรวจสอบว่ามีข้อมูลการเข้าสู่ระบบที่จำไว้หรือไม่
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
    const newValue = type === "checkbox" ? checked : value; // ถ้าเป็น checkbox ให้ใช้ checked เป็นค่าใหม่
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
      alert("Login successful");
      if (formData.rememberMe) {
        // ถ้าผู้ใช้ติก Remember me จะจำข้อมูลการเข้าสู่ระบบ
        localStorage.setItem("rememberMeData", JSON.stringify(formData));
      } else {
        // ถ้าไม่ติก Remember me จะลบข้อมูลการเข้าสู่ระบบที่จำไว้
        localStorage.removeItem("rememberMeData");
      }
      navigate("/Play_select");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="border border-gray-300 bg-white shadow-md rounded-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
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
                  placeholder="Email address"
                />
              </div>

              <div style={{ marginTop: "4px" }}>
                <label htmlFor="password" className="sr-only">
                  Password
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
                  placeholder="Password"
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
                  checked={formData.rememberMe} // ตรวจสอบ state ของ Remember me
                  onChange={handleChange} // เมื่อเปลี่ยนค่าให้เรียกฟังก์ชัน handleChange
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/ForgotPassword"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="text-sm">
              <h1 style={{ color: "black" }}>
              Don't have an account?{" "}
                <Link
                  to="/UI_select"
                  className="underline font-medium text-indigo-600 hover:text-indigo-500"
                >
                   Register
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
