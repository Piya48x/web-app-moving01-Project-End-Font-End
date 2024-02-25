import { useState, useEffect } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css"; // นำเข้า Tailwind CSS
import SuccessPage from "./SuccessPage";
import NavbarSV from "./NavbarSV";
import { useNavigate } from "react-router-dom";
import FollowCustomer from "./FollowCustomer";

// ถ้าเซิร์ฟเวอร์ของคุณทำงานที่ http://localhost:3000
const socket = io("http://localhost:3000");

// คอมโพเนนต์แผนที่
function Map({ initialCenter, pickupLocation, dropoffLocation }) {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: initialCenter,
          zoom: 12,
        }
      );

      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      newDirectionsRenderer.setMap(newMap);

      setMap(newMap);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
    };

    if (!window.google) {
      console.error("Google Maps API ไม่ได้โหลด");
      return;
    }

    initMap();

    return () => {
      if (map) {
        // ทำความสะอาดอินสแตนซ์แผนที่
        setMap(null);
      }
    };
  }, [initialCenter]);

  useEffect(() => {
    if (directionsService && pickupLocation && dropoffLocation) {
      const origin = new window.google.maps.LatLng(
        pickupLocation.lat,
        pickupLocation.lng
      );
      const destination = new window.google.maps.LatLng(
        dropoffLocation.lat,
        dropoffLocation.lng
      );

      const request = {
        origin,
        destination,
        travelMode: "DRIVING",
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error("การขอเส้นทางล้มเหลวเนื่องจาก " + status);
        }
      });
    }
  }, [directionsService, pickupLocation, dropoffLocation]);

  return <div id="map" className="h-96 w-full"></div>;
}

// คอมโพเนนต์ของพนักงานขับ
function DriverComponent() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [order, setOrder] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false); // สถานะเพื่อติดตามว่าพนักงานขับกำลังรับคำสั่งหรือไม่
  const [jobFinished, setJobFinished] = useState(false);
  const [chat, setChat] = useState(false); // สถานะเพื่อติดตามว่าการสนทนากับลูกค้าเริ่มขึ้นหรือไม่
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับเริ่มต้น Google Maps และตั้งค่าตำแหน่งของพนักงานขับรถ
  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setDriverLocation({ lat: latitude, lng: longitude });
    };

    const errorCallback = (error) => {
      console.error("เกิดข้อผิดพลาดในการรับตำแหน่ง:", error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  // เอฟเฟกต์สำหรับฟังเหตุการณ์รับคำสั่งใหม่
  useEffect(() => {
    // ฟังก์ชันเมื่อได้รับเหตุการณ์ 'newOrder' จากเซิร์ฟเวอร์
    const handleNewOrder = (newOrder) => {
      // อัปเดตสถานะคำสั่งด้วยคำสั่งใหม่
      setOrder(newOrder);
    };

    socket.on("newOrder", handleNewOrder);

    // ทำความสะอาดฟังก์ชันเซ็ตเลนเนอร์
    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, []);

  const handleRejectOrder = () => {
    setOrder(null); // เคลียร์คำสั่งเมื่อปฏิเสธ
    setAcceptingOrder(false); // ตั้งค่าสถานะรับคำสั่งเป็นเท็จเมื่อปฏิเสธคำสั่ง

    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit("orderCancelled");
  };

  const handleAcceptOrder = () => {
    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit("orderAccepted");
    socket.emit("orderReceived2", order);
    // ปิดปุ่มรับคำสั่งและปฏิเสธคำสั่ง
    setAcceptingOrder(true);
  };

  // เพิ่มฟังก์ชัน handleViewOnGoogleMaps เพื่อเปิดลิงก์ไปยัง Google Maps
  const handleViewOnGoogleMaps = () => {
    if (order.pickupLocation && order.dropoffLocation) {
      const pickupCoords = `${order.pickupLocation.lat},${order.pickupLocation.lng}`;
      const dropoffCoords = `${order.dropoffLocation.lat},${order.dropoffLocation.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${pickupCoords}&destination=${dropoffCoords}`;
      window.open(url, "_blank");
    }
  };

  const handleFinishJob = async () => {
    socket.emit("jobFinished");

    const orderData = {
      vehicle: order.vehicle,
      bookingStatus: order.bookingStatus,
      pickupLocation: order.pickupLocation,
      dropoffLocation: order.dropoffLocation,
      selectedDateTime: order.selectedDateTime,
      totalDistance: order.totalDistance,
      totalCost: order.totalCost,
    };

    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        console.log("บันทึกคำสั่งเรียบร้อยแล้ว");
        setJobFinished(true);
        setOrder(null);
        setAcceptingOrder(false);
        setChat(false)
      } else {
        console.error("การบันทึกคำสั่งล้มเหลว");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกคำสั่ง:", error);
    }
  };

  const handleConfirmFinishJob = () => {
    const isConfirmed = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการจบงานนี้?"
    );
    if (isConfirmed) {
      handleFinishJob(); // เรียกใช้ handleFinishJob หากผู้ใช้ยืนยันการเสร็จสิ้นงาน
    }
  };

  const handleBackToDashboard = () => {
    setJobFinished(false); // เมื่อคลิกปุ่ม "กลับไปที่แดชบอร์ด" ให้ตั้งค่า jobFinished เป็น false เพื่อให้สามารถรับคำสั่งใหม่ได้อีกครั้ง
  };

  return (
    <>
      <NavbarSV/>
     
      <hr />
      <div className="container mx-auto p-4">
        {/* แสดงหน้า SuccessPage หากงานเสร็จสิ้น */}
        {jobFinished ? (
          <SuccessPage onBackToDashboard={handleBackToDashboard} />
        ) : (
          <div>
            <Map
              initialCenter={driverLocation || { lat: 0, lng: 0 }}
              pickupLocation={order?.pickupLocation}
              dropoffLocation={order?.dropoffLocation}
            />
            {driverLocation && (
              <p className="text-center mt-4">
                ตำแหน่งของพนักงานขับ: ละติจูด {driverLocation.lat}, ลองจิจูด{" "}
                {driverLocation.lng}
              </p>
            )}
            <hr />
            {order && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">รายละเอียดคำสั่ง</h2>
                <p>ยานพาหนะ: {order.vehicle}</p>
                <p>สถานะการจอง: {order.bookingStatus}</p>
                {order.pickupLocation && (
                  <p>สถานที่รับสินค้า: {order.pickupLocation.name}</p>
                )}
                {order.dropoffLocation && (
                  <p>สถานที่ส่งสินค้า: {order.dropoffLocation.name}</p>
                )}
                {/* <p>เวลาที่เลือก: {order.selectedDateTime}</p> */}
                <p>ระยะทางทั้งหมด: {order.totalDistance} กิโลเมตร</p>
                <p>ราคาทั้งหมด: {order.totalCost} บาท</p>
                <div className="flex justify-center mt-4">
                  {acceptingOrder ? (
                    <>
                    <div>
                      <div className="mt-20 flex relative">
                        <div style={{marginLeft: '1px', marginBottom: '50px'}} className=" bg-gray-200 p-4 rounded-lg max-w-md">
                          <FollowCustomer />
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-wrap">
                        <button
                          onClick={handleViewOnGoogleMaps}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                        >
                          ดูบน Google Maps
                        </button>
                        <button
                          onClick={handleConfirmFinishJob}
                          className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                          จบงาน
                        </button>
                      </div>
                    </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleAcceptOrder}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                      >
                        รับคำสั่ง
                      </button>
                      <button
                        onClick={handleRejectOrder}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        ปฏิเสธคำสั่ง
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {!acceptingOrder && !order && (
              <p className="text-center mt-8">กำลังค้นหาคำสั่ง...</p>
            )}
          </div>
        )}
      </div>
      <hr />
      
    </>
  );
}

export default DriverComponent;
