/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import NavbarCUS from './NavbarCUS';
import backgroundImage from './img/1.png'; // เปลี่ยนเป็นที่อยู่ของรูปภาพพื้นหลัง

function SuccessCustomer() {
    const navigate = useNavigate();
  
    return (
        <>
            <NavbarCUS />
            <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container mx-auto p-4">
                    <h1 style={{fontSize: 70}} className="text-3xl font-bold  mb-96  text-center">งานเสร็จสมบูรณ์แล้ว!</h1>
                    <div className="flex justify-center">
                        <button onClick={() => navigate("/CustomerComponent")} className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            กลับไปที่แดชบอร์ด
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SuccessCustomer;
