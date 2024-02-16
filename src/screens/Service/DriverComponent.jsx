/* eslint-disable no-undef */
import  { useState, useEffect } from 'react';
import io from 'socket.io-client';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import SuccessPage from './SuccessPage';

// Assuming your server is running at http://localhost:3000
const socket = io('http://localhost:3000');

// Map component
function Map({ initialCenter, pickupLocation, dropoffLocation }) {
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: initialCenter,
        zoom: 12,
      });

      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      newDirectionsRenderer.setMap(newMap);

      setMap(newMap);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
    };

    if (!window.google) {
      console.error('Google Maps API not loaded.');
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
      const origin = new window.google.maps.LatLng(pickupLocation.lat, pickupLocation.lng);
      const destination = new window.google.maps.LatLng(dropoffLocation.lat, dropoffLocation.lng);

      const request = {
        origin,
        destination,
        travelMode: 'DRIVING',
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          console.error('Directions request failed due to ' + status);
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

  // Function to initialize Google Maps and set driver's location
  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setDriverLocation({ lat: latitude, lng: longitude });
    };

    const errorCallback = (error) => {
      console.error('Error getting geolocation:', error);
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

    socket.on('newOrder', handleNewOrder);

    // Clean up socket listener
    return () => {
      socket.off('newOrder', handleNewOrder);
    };
  }, []);

  const handleRejectOrder = () => {
    setOrder(null); // Clear the order when rejecting it
    setAcceptingOrder(false); // Set acceptingOrder state to false when rejecting the order

    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit('orderCancelled');
  };

  const handleAcceptOrder = () => {
    // ส่งข้อความผ่าน Socket.IO ไปยัง CustomerComponent
    socket.emit('orderAccepted');
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

  // เพิ่มฟังก์ชัน handleFinishJob สำหรับส่งอีเวนต์เพื่อแสดงการเสร็จสิ้นงาน
  const handleFinishJob = () => {
    socket.emit('jobFinished');
    setJobFinished(true); // เมื่อกดปุ่ม "Finish Job" ให้ตั้งค่า jobFinished เป็น true
    setOrder(null); // Clear the order when rejecting it
    setAcceptingOrder(false);
  };

  const handleConfirmFinishJob = () => {
    const isConfirmed = window.confirm("Are you sure you want to finish this job?");
    if (isConfirmed) {
      handleFinishJob(); // เรียกใช้ handleFinishJob หากผู้ใช้ยืนยันการเสร็จสิ้นงาน
    }
  };

  const handleBackToDashboard = () => {
    setJobFinished(false); // เมื่อกดปุ่ม "Back to Dashboard" ให้ตั้งค่า jobFinished เป็น false เพื่อให้สามารถยอมรับคำสั่งใหม่ได้อีกครั้ง
  };

  return (
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
              Driver's Location: Latitude {driverLocation.lat}, Longitude{' '}
              {driverLocation.lng}
            </p>
          )}
          {order && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <p>Vehicle: {order.vehicle}</p>
              <p>Booking Status: {order.bookingStatus}</p>
              {order.pickupLocation && <p>Pickup Location: {order.pickupLocation.name}</p>}
              {order.dropoffLocation && <p>Drop-off Location: {order.dropoffLocation.name}</p>}
              <p>Selected DateTime: {order.selectedDateTime}</p>
              <p>Total Distance: {order.totalDistance} km</p>
              <p>Total Cost: {order.totalCost} Baht</p>
              <div className="flex justify-center mt-4">
                {acceptingOrder ? (
                  <>
                    <button onClick={handleViewOnGoogleMaps} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                      View on Google Maps
                    </button>
                    <button onClick={handleConfirmFinishJob} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
  Finish Job
</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleAcceptOrder} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                      Accept Order
                    </button>
                    <button onClick={handleRejectOrder} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Reject Order
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {!acceptingOrder && !order && (
            <p className="text-center mt-8">Currently not accepting orders.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DriverComponent;
