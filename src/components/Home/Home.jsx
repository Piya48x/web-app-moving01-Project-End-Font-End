/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import backgroundImage from "./a.jpg"; // แทนที่ด้วยที่อยู่ของรูปภาพที่คุณต้องการใช้
import "./styles.css";

function Home() {
  const HomeStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "800px",
    display: "flex",
    flexDirection: "column", // เพิ่มส่วนนี้
    justifyContent: "center",
    alignItems: "center",
    color: "#000", // สีข้อความ
    position: "relative",
  };

  const buttonStyle = {
    padding: "15px 80px", // ปรับขนาดของปุ่ม
    backgroundColor: "#fff",
    color: "black",
    border: "2px solid blue",
    borderRadius: "50px",
    cursor: "pointer",
    marginTop: "100px", // ระยะห่างจากข้อความเล็ก
    textAlign: "center",
    justifyContent: "center",
    marginLeft: "-40px",
    maxWidth: "600px",
    fontWeight: "bold",
    
  };

  const textContainerStyle = {
    marginTop: "0px",
    marginBottom: "100px",
    textAlign: "center",
  };

  const headerStyle = {
    fontSize: "2em",
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
    fontWeight: "bold",
  };
  function Welcome() {
    return (
      <>
        <Navbar />
        <div style={{ color: "black" }}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2em",
              marginBottom: "30px",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            Welcome to Our Website
          </h1>
          <center>
            <hr style={{ width: "200px" }} />
          </center>
          <p
            style={{
              textAlign: "center",
              maxWidth: "900px",
              margin: "auto",
              marginTop: "30px",
            }}
          >
            Key Features: Easy Registration and Login User-Friendly Interface
            for Selecting Pick-up and Delivery Points Convenient Time
            Reservation for Moving Services Selection of Various Vehicle Types
            Real-time Communication through Calls and Chat Detailed Summary of
            Addresses and Costs GPS Navigation for Efficient Routes In-app
            Calculation of Fare Charges Service Provider Status Management
            Experience the future of moving items with our innovative
            application. Join us and make your moving experience smooth,
            reliable, and hassle-free. Get started today!
          </p>
        </div>
      </>
    );
  }
  function Fiex() {
    return (
      <>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "30px",
            color: "black",
          }}
        >
          Our Services
        </h1>

        <center>
          <hr style={{ width: "200px" }} />
        </center>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            gap: 10,
            marginTop: "20px",
            height: "300px",
          }}
        >
          {/* กล่องที่ 1 */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#31304D",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              Easy Registration
            </h2>
            <p>Conveniently register and log in to access our services.</p>
          </div>

          {/* กล่องที่ 2 */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#B6BBC4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              User-Friendly Interface
            </h2>
            <p>
              Select pick-up and delivery points with ease using our friendly
              interface.
            </p>
          </div>

          {/* กล่องที่ 3 */}
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#31304D",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "1.5em" }}>
              Real-time Communication
            </h2>
            <p>
              Stay connected through real-time calls and chat for efficient
              communication.
            </p>
          </div>
        </div>
      </>
    );
  }
  function Footer() {
    return (
      <>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "2em",
            marginBottom: "30px",
            textAlign: "center",
            marginTop: "30px",
            color: "black",
          }}
        >
          Our About
        </h1>
        <center>
          <hr style={{ width: "200px" }} />
        </center>
        <div style={{ color: "black" }}>
          <div
            style={{
              height: "300px",
              background: "#D9D9D9",
              marginTop: "40px",
            }}
          >
            <div className="flex justify-center">
              <div
                style={{ marginTop: "40px" }}
                className="rounded-full overflow-hidden border-4 border-white"
              >
                <img
                  src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/370908546_1975921156116128_816666289389713510_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=66OeyE9sBqYAX9kDsyo&_nc_ht=scontent.fkkc3-1.fna&oh=00_AfCgcNfUgxE81DasrskhbgbTyr-bHTidu35ruyRh_1gmuA&oe=65C5CAFB" // Replace with the actual path to your image
                  alt="Avatar Image"
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <h6 className="text-xl font-semibold">Piya Pholuea</h6>
              <p className="text-gray-600">
                computer science In the 4-year bachelors degree program, regular
                semester Computer Science at Maha Sarakham Rajabhat University
                Center Campus
                {/* วิทยาการคอมพิวเตอร์ ในหลักสูตรปริญญาตรี 4 ปี ภาคปกติ
              วิทยาการคอมพิวเตอร์ ณ วิทยาเขตศูนย์มหาวิทยาลัยราชภัฏมหาสารคาม */}
              </p>
              <p className="text-gray-600">
                Born on 13/10/2000 in Kalasin Province. and current address at
                Kham Pa-o Kuddon, Huai Mek district/district Kalasin Province
                46170 Telephone 0934177064
                {/* เกิดเมื่อวันที่ 13/10/2543 ที่จังหวัดกาฬสินธุ์
              และที่อยู่ปัจจุบันที่ คำปะโอ กุดโดน เขต/อำเภอ ห้วยเม็ก
              จังหวัดกาฬสินธุ์ 46170 โทรศัพท์ 0934177064 */}
              </p>
            </div>
          </div>
          <div
            style={{
              height: "100px",
              background: "#31304D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ textAlign: "center", color: "white" }}>
              Copyright 2024
            </p>
          </div>
        </div>{" "}
      </>
    );
  }
  return (
    <>
      <div style={HomeStyle}>
        <div style={textContainerStyle}>
          <h1 style={headerStyle}>
            WebApplication Management web application for moving items
          </h1>
          <p style={paragraphStyle}>
            Welcome to our Web Application Management System for Moving Items!
            Our platform is designed to provide seamless and efficient
            management of the moving process. Whether you are a service provider
            or a user in need of moving items, our application offers a
            user-friendly interface and advanced features to enhance your
            experience.
          </p>
        </div>
        <div>
          <Link to="/CustomerMain">
            <button className="button border-blue-500" style={buttonStyle}>
              GET STARTED
            </button>
          </Link>
        </div>
      </div>
      <Welcome />
      <Fiex />
      <Footer />
    </>
  );
}

export default Home;
