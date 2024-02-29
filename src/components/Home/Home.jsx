/* eslint-disable react/no-unknown-property */
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
    color: 'black',
    marginTop: '80px'

  };

  const paragraphStyle = {
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto",
    fontWeight: "bold",
    color: 'black'
  };
  function Welcome() {
    return (
      <>
        <Navbar />
        <div style={textContainerStyle} >
  <h1 style={headerStyle}>
    ระบบจัดการเว็บแอพพลิเคชั่นสำหรับการย้ายของ
  </h1>
  <p style={paragraphStyle}>
    ยินดีต้อนรับสู่ระบบจัดการเว็บแอพพลิเคชั่นสำหรับการย้ายของของเรา!
    แพลตฟอร์มของเราถูกออกแบบมาเพื่อให้การจัดการกระบวนการย้ายของเป็นไปอย่างราบรื่นและมีประสิทธิภาพ
    ไม่ว่าคุณจะเป็นผู้ให้บริการหรือผู้ใช้ที่ต้องการย้ายของ
    แอปพลิเคชั่นของเรามีอินเตอร์เฟซที่ใช้งานง่ายและคุณสมบัติขั้นสูงเพื่อเสริมประสบการณ์ของคุณ
  </p>
</div>

        <hr />
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
            ยินดีต้อนรับสู่เว็บไซต์ของเรา
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
            คุณลักษณะหลัก: การลงทะเบียนและเข้าสู่ระบบง่าย ๆ การเลือกสถานที่
            และส่งสินค้าผ่านอินเตอร์เฟซที่ใช้งานง่าย เวลาที่สะดวกสำหรับการจองบริการ
            เลือกประเภทยานพาหนะต่าง ๆ การสื่อสารแบบเรียลไทม์ผ่านการโทรและแชท
            สรุปรายละเอียดที่อยู่และค่าใช้จ่ายอย่างละเอียด
            การนำทางด้วย GPS สำหรับเส้นทางที่มีประสิทธิภาพ การคำนวณค่าบริการในแอพ
            การจัดการสถานะผู้ให้บริการ มาสัมผัสประสบการณ์การย้ายของโดยใช้แอพฯ
            ของเราที่นวัตกรรม มาร่วมเป็นส่วนหนึ่งและทำให้ประสบการณ์การย้ายของคุณ
            ราบรื่น น่าเชื่อถือ และปลอดภัย โดยเริ่มต้นใช้บริการได้เลยวันนี้!
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
          บริการของเรา
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
              การลงทะเบียนง่าย
            </h2>
            <p>ลงทะเบียนและเข้าสู่ระบบได้อย่างสะดวกสบาย</p>
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
              อินเตอร์เฟซที่ใช้งานง่าย
            </h2>
            <p>
              เลือกสถานที่และจุดส่งสินค้าได้โดยง่ายดายโดยใช้อินเตอร์เฟซที่เป็นมิตร
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
              การสื่อสารแบบเรียลไทม์
            </h2>
            <p>
              คงอยู่ต่อการสื่อสารผ่านการโทรและแชทแบบเรียลไทม์เพื่อการสื่อสารที่มีประสิทธิภาพ
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
          เกี่ยวกับเรา
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
                  src="https://scontent-bkk1-1.xx.fbcdn.net/v/t39.30808-6/370908546_1975921156116128_816666289389713510_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeGuY_ItJHJz_9XabwfUWN0Z1m-Hx8stz7XWb4fHyy3PtVAsKEmsZUmiU_MZ_dj4Wo-pG2UQmXbuSEMbHdJ3ofwa&_nc_ohc=vNuVaiBvUTAAX_x7oD3&_nc_ht=scontent-bkk1-1.xx&oh=00_AfC8EkaysDZ4dWoI71pYWF3NNgcthR9VQrv-cAQxfjk7yA&oe=65D9917B" // Replace with the actual path to your image
                  alt="Avatar Image"
                  className="w-24 h-24 object-cover"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <h6 className="text-xl font-semibold">Piya Pholuea</h6>
              <p className="text-gray-600">
                วิทยาการคอมพิวเตอร์ในหลักสูตรปริญญาตรี 4 ปี ภาคปกติ
                วิทยาการคอมพิวเตอร์ณ มหาวิทยาลัยราชภัฏมหาสารคาม
              </p>
              <p className="text-gray-600">
                เกิดเมื่อวันที่ 13/10/2543 ที่จังหวัดกาฬสินธุ์
                และที่อยู่ปัจจุบันที่ คำปะโอ กุดโดน เขต/อำเภอ ห้วยเม็ก
                จังหวัดกาฬสินธุ์ 46170 โทรศัพท์ 0934177064
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
              ลิขสิทธิ์ 2024
            </p>
          </div>
        </div>{" "}
      </>
    );
  }
  return (
    <>
      <div style={HomeStyle}>
        
        <div>
          <Link to="/CustomerMain">
            <button class="text-container" className="button border-blue-500" style={buttonStyle}>
              เริ่มต้นใช้งาน
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
