import { Link } from "react-router-dom";
// import axios from "axios";

function Play_select() {
 // const navigate = useNavigate(); // เรียกใช้ Hook useNavigate เพื่อนำไปใช้ในการเปลี่ยนหน้า

  // const handleLogout = async () => {
  //   try {
  //     // Get the token from local storage or wherever it's stored
  //     const token = localStorage.getItem("token");

  //     // Send the token along with the request
  //     const response = await axios.post(
  //       "http://localhost:3000/api/logout",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Logout successful");
  //       // Clear the token from local storage
  //       localStorage.removeItem("token");
  //       // Redirect the user to the login page
  //       window.location.href = '/login';
  //     } else {
  //       console.error("Failed to logout:", response.statusText);
  //       // Handle failed logout
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error.message);
  //     // Handle error during logout
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4">
        <h2 className="text-3xl font-semibold mb-8 col-span-2 text-center">
          เลือกสถานะของคุณ
        </h2>
        {/* กล่องสำหรับลูกค้า */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">ลูกค้า</h2>
          <Link
            to="/CustomerComponent"
            className="text-lg bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            ไปยังหน้าลูกค้า
          </Link>
        </div>
        {/* กล่องสำหรับพนักงานขับรถ */}
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">พนักงานขับรถ</h2>
          <Link
            to="/DriverComponent"
            className="text-lg bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            ไปยังหน้าพนักงานขับรถ
          </Link>
        </div>
        {/* <div className="bg-red-500 text-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">ออกจากระบบ</h2>
          <button
            onClick={handleLogout}
            className="text-lg bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-100"
          >
            ออกจากระบบ
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Play_select;
