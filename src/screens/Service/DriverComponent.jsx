import { useState, useEffect } from "react";
import io from "socket.io-client";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import SuccessPage from "./SuccessPage";
import NavbarSV from "./NavbarSV";
import { useNavigate } from "react-router-dom";
import FollowCustomer from "./FollowCustomer";



// Assuming your server is running at http://localhost:3000
const socket = io("http://localhost:3000");

// Map component
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
      console.error("Google Maps API not loaded.");
      return;
    }

    initMap();

    return () => {
      if (map) {
        // Clean up map instance
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
          console.error("Directions request failed due to " + status);
        }
      });
    }
  }, [directionsService, pickupLocation, dropoffLocation]);

  return <div id="map" className="h-96 w-full"></div>;
}

// Driver component
function DriverComponent() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [order, setOrder] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false); // State to track whether the driver is accepting orders or not
  const [jobFinished, setJobFinished] = useState(false);
  const [chat, setChat] = useState(false); // State to track whether the chat with customer is started or not
  const navigate = useNavigate();

  // Function to initialize Google Maps and set driver's location
  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setDriverLocation({ lat: latitude, lng: longitude });
    };

    const errorCallback = (error) => {
      console.error("Error getting geolocation:", error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  // Effect to listen for new orders
  useEffect(() => {
    // Event listener when receiving 'newOrder' event from the server
    const handleNewOrder = (newOrder) => {
      // Update order state with the new order
      setOrder(newOrder);
    };

    socket.on("newOrder", handleNewOrder);

    // Clean up socket listener
    return () => {
      socket.off("newOrder", handleNewOrder);
    };
  }, []);

  const handleRejectOrder = () => {
    setOrder(null); // Clear the order when rejecting it
    setAcceptingOrder(false); // Set acceptingOrder state to false when rejecting the order

    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit("orderCancelled");
  };

  const handleAcceptOrder = () => {
    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit("orderAccepted");
    socket.emit("orderReceived2", order);
    // ทำการปิดปุ่ม Accept Order และ Reject Order
    setAcceptingOrder(true);
  };

  // เพิ่มฟังก์ชัน handleViewOnGoogleMaps สำหรับเปิดลิงก์ไปยัง Google Maps
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
        console.log("Order saved successfully");
        setJobFinished(true);
        setOrder(null);
        setAcceptingOrder(false);
        setChat(false)
      } else {
        console.error("Failed to save order");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const handleConfirmFinishJob = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to finish this job?"
    );
    if (isConfirmed) {
      handleFinishJob(); // เรียกใช้ handleFinishJob หากผู้ใช้ยืนยันการเสร็จสิ้นงาน
    }
  };

  const handleBackToDashboard = () => {
    setJobFinished(false); // เมื่อกดปุ่ม "Back to Dashboard" ให้ตั้งค่า jobFinished เป็น false เพื่อให้สามารถยอมรับคำสั่งใหม่ได้อีกครั้ง
  };

  return (
    <>
      <NavbarSV/>
     
      <hr />
      <div className="container mx-auto p-4">
        {/* Display SuccessPage if job is finished */}
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
                Driver's Location: Latitude {driverLocation.lat}, Longitude{" "}
                {driverLocation.lng}
              </p>
            )}
            <hr />
            {order && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                <p>Vehicle: {order.vehicle}</p>
                <p>Booking Status: {order.bookingStatus}</p>
                {order.pickupLocation && (
                  <p>Pickup Location: {order.pickupLocation.name}</p>
                )}
                {order.dropoffLocation && (
                  <p>Drop-off Location: {order.dropoffLocation.name}</p>
                )}
                <p>Selected DateTime: {order.selectedDateTime}</p>
                <p>Total Distance: {order.totalDistance} km</p>
                <p>Total Cost: {order.totalCost} Baht</p>
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
                       View on Google Maps
                     </button>
                     <button
                       onClick={handleConfirmFinishJob}
                       className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                     >
                       Finish Job
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
                        Accept Order
                      </button>
                      <button
                        onClick={handleRejectOrder}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject Order
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {!acceptingOrder && !order && (
              <p className="text-center mt-8">Searching for orders...</p>
            )}
          </div>
        )}
      </div>
      <hr />
      
    </>
  );
}

export default DriverComponent;
