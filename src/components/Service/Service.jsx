/* eslint-disable no-unused-vars */

import Navbar from "../Navbar/Navbar";

import backgroundImage from "./david-clarke-bsIjsf7wEXE-unsplash.jpg";
const HomeStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "800px",
  display: "flex",
  flexDirection: "column", // เพิ่มส่วนนี้
  justifyContent: "center",
  alignItems: "center",
  color: "#fff", // สีข้อความ
  position: "relative",
  
};
const textContainerStyle = {
  marginTop: "0px",
  marginBottom: "100px",
  textAlign: "center",
};

function Service() {
  return (
    <>
      <div style={HomeStyle}>
        <Navbar />
        <div style={textContainerStyle}>
          <>
            <h1 className="font-bold text-2xl mb-6">Our Services</h1>

            <hr className="w-40 mx-auto mb-6" />

            <div style={{height: '280px'}} className="flex justify-center gap-6 h-40">
              {/* กล่องที่ 1 */}
              <div className="flex-1 p-6 bg-white text-black rounded-lg">
                <h2 className="font-bold text-xl mb-3">Easy Registration</h2>
                <p>Conveniently register and log in to access our services.</p>
              </div>

              {/* กล่องที่ 2 */}
              <div className="flex-1 p-6 bg-gray-400 text-black rounded-lg">
                <h2 className="font-bold text-xl mb-3">User-Friendly Interface</h2>
                <p>Select pick-up and delivery points with ease using our friendly interface.</p>
              </div>

              {/* กล่องที่ 3 */}
              <div className="flex-1 p-6 bg-white text-black  rounded-lg">
                <h2 className="font-bold text-xl mb-3">Real-time Communication</h2>
                <p>Stay connected through real-time calls and chat for efficient communication.</p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Service;
