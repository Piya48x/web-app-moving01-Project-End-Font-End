import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 

function NavbarCUS() {
  const [showNotification, setShowNotification] = useState(false);

  // Function to handle notification click
  const handleNotificationClick = () => {
    // Logic to handle notification click
    // For example, redirect to notification page
  };

  const handleLogout = async () => {
    try {
      // Get the token from local storage or wherever it's stored
      const token = localStorage.getItem("token");

      // Send the token along with the request
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        console.log("Logout successful");
        // Clear the token from local storage
        localStorage.removeItem("token");
        // Redirect the user to the login page
        window.location.href = '/login';
      } else {
        console.error("Failed to logout:", response.statusText);
        // Handle failed logout
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
      // Handle error during logout
    }
  };


  return (
    <div style={{borderBottomLeftRadius: '10PX', borderBottomRightRadius: "10PX"}} className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/CustomerComponent">หน้าหลัก</Link></li>
            {/* <li><a>โปรไฟล์</a></li> */}
            <li><Link to="/Booking">ประวัติการสั่งจอง</Link></li>
          <br />
          <br />

            <li  onClick={handleLogout}><a>ออกจากระบบ</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Custoemr</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={handleNotificationClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {/* Show notification badge if there are notifications */}
          {showNotification && <span className="badge badge-xs badge-primary indicator-item"></span>}
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default NavbarCUS;
