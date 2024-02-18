/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/th";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarCUS from "./NavbarCUS";
import FollowDriverComponent from "./FollowDriverComponent";

const socket = io("http://localhost:3000");
//const googleMapsApiKey = "AIzaSyAp5OleyH2H46AGS4kFoPvVu2SDZqCz5nc"; // Replace with your API key
const googleMapsApiKey = "AIzaSyDaxJ68f77blduDAbITOX0hfp-CDfhOYO4"; // Replace with your API key

function CustomerComponent() {
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [pickupLocationInput, setPickupLocationInput] = useState("");
  const [dropoffLocationInput, setDropoffLocationInput] = useState("");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [orders, setOrders] = useState([]);
  

  const navigate = useNavigate();

  // ใน CustomerComponent
  // useEffect เพื่อรับข้อความจาก DriverComponent เมื่อมีการยกเลิกการสั่งซื้อ
  useEffect(() => {
    const handleOrderCancelled = () => {
      // ตั้งค่า showAlert เมื่อมีการยกเลิกคำสั่ง
      setShowAlert(true);
    };

    // ตั้งค่าการฟังเหตุการณ์การยกเลิกการสั่งซื้อ
    socket.on("orderCancelled", handleOrderCancelled);

    // ทำความสะอาด listener เมื่อ unmount
    return () => {
      socket.off("orderCancelled", handleOrderCancelled);
    };
  }, []);

  useEffect(() => {
    const handleOrderCancelled1 = () => {
      // แสดงข้อความเมื่อมีการยกเลิกการสั่งซื้อ
      alert("คนขับได้ตอบรับ Order เรียบร้อยแล้ว.");
      setTimeout(()=>{
        //navigate("/FollowDriverComponent");
      }, 2000)
      
    };

    // ตั้งค่าการฟังเหตุการณ์การยกเลิกการสั่งซื้อ
    socket.on("orderAccepted", handleOrderCancelled1);

    // ทำความสะอาด listener เมื่อ unmount
    return () => {
      socket.off("orderAccepted", handleOrderCancelled1);
    };
  }, []);

  useEffect(() => {
    const handleOrderCancelled2 = () => {
      navigate("/SuccessCustomer");
    };

    // ตั้งค่าการฟังเหตุการณ์การยกเลิกการสั่งซื้อ
    socket.on("jobFinished", handleOrderCancelled2);

    // ทำความสะอาด listener เมื่อ unmount
    return () => {
      socket.off("jobFinished", handleOrderCancelled2);
    };
  }, []);

  // useEffect(() => {
  //   // Listen for currentUserInfo event from DriverComponent
  //   socket.on("currentUserInfo", (userInfo) => {
  //     setCurrentUserInfo(userInfo);
  //   });

  //   return () => {
  //     // Clean up socket listener
  //     socket.off("currentUserInfo");
  //   };
  // }, []);

  const calculateRoute = async () => {
    if (pickupLocation && dropoffLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      const request = {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const route = result.routes[0];
          let totalDistance = 0;

          route.legs.forEach((leg) => {
            totalDistance += leg.distance.value;
          });

          const totalDistanceInKm = totalDistance / 1000;
          const totalCost = totalDistanceInKm * 25; // ค่าคำนวณเส้นทาง กิโลละ 25 บาท

          // แสดงผลเป็นเด้งเมื่อเลือกจุดรับและจุดส่งเสร็จสิ้น
          if (pickupLocation && dropoffLocation) {
            setTotalDistance(totalDistanceInKm);
            setTotalCost(totalCost);
            setShowOrderConfirmation(true);
          }
        } else {
          console.error("Error calculating route:", status);
          alert("Error calculating route. Please try again later.");
        }
      });
    }
  };

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const errorCallback = (error) => {
      console.error("Error getting geolocation:", error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: currentPosition.lat, lng: currentPosition.lng },
        zoom: 15,
      });

      const pickupAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("pickup-input")
      );

      const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("dropoff-input")
      );

      pickupAutocomplete.addListener("place_changed", () => {
        const place = pickupAutocomplete.getPlace();
        setPickupLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        });

        if (pickupMarker) {
          pickupMarker.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          map: map,
          title: place.name,
        });

        setPickupMarker(marker);
      });

      dropoffAutocomplete.addListener("place_changed", () => {
        const place = dropoffAutocomplete.getPlace();
        setDropoffLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.name,
        });

        if (dropoffMarker) {
          dropoffMarker.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          map: map,
          title: place.name,
        });

        setDropoffMarker(marker);
      });
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPosition]);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      const renderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: {
          strokeColor: "blue",
          strokeOpacity: 0.7,
          strokeWeight: 5,
        },
      });

      directionsService.route(
        {
          origin: pickupLocation,
          destination: dropoffLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            renderer.setDirections(result);
            setDirectionsRenderer(renderer);
          } else {
            console.error("Error calculating route:", status);
            alert("Error calculating route. Please try again later.");
          }
        }
      );
    }
  }, [pickupLocation, dropoffLocation]);

  const clearPickupLocation = () => {
    setPickupLocation(null);
    setPickupLocationInput("");

    if (pickupMarker) {
      pickupMarker.setMap(null);
    }
  };

  const clearDropoffLocation = () => {
    setDropoffLocation(null);
    setDropoffLocationInput("");

    if (dropoffMarker) {
      dropoffMarker.setMap(null);
    }
  };

  const handleBookingStatusChange = (status) => {
    if (status === "Scheduled") {
      setSelectedDateTime(new Date());
      setSelectedBookingStatus(status);
    } else {
      setSelectedBookingStatus(status);
    }
  };

  // const handleSubmit = async () => {
  //   // Create order data
  //   const orderData = {
  //     vehicle: selectedVehicle,
  //     bookingStatus:
  //       selectedBookingStatus === "Scheduled"
  //         ? moment(selectedDateTime).locale("th").format("YYYY-MM-DD[T]HH:mm")
  //         : selectedBookingStatus,
  //     pickupLocation,
  //     dropoffLocation,
  //     selectedDateTime,
  //     totalDistance,
  //     totalCost,
  //   };

  //   try {
  //     // Send the order data to the server via Socket.IO
  //     socket.emit("orderReceived", orderData);
      

  //     console.log("Order data sent:", orderData);
  //     alert("โปรดรอสักครู่ กำลังค้นหาคนขับ...");

  //     // Reset state values
  //     setSelectedVehicle("");
  //     setSelectedBookingStatus("");
  //     setPickupLocationInput("");
  //     setDropoffLocationInput("");
  //     setPickupLocation(null);
  //     setDropoffLocation(null);
  //     setSelectedDateTime(null);
  //     setTotalDistance(0); // Reset total distance
  //     setTotalCost(0); // Reset total cost
  //     setShowOrderConfirmation(false); // Hide order confirmation
  //   } catch (error) {
  //     console.error("Error sending order data:", error.message);
  //     alert("Error sending order data. Please try again later.");
  //   }
  // };

  const handleSubmit = async () => {
    // Create order data
    const orderData = {
      vehicle: selectedVehicle,
      bookingStatus:
        selectedBookingStatus === "Scheduled"
          ? moment(selectedDateTime).locale("th").format("YYYY-MM-DD[T]HH:mm")
          : selectedBookingStatus,
      pickupLocation,
      dropoffLocation,
      selectedDateTime,
      totalDistance,
      totalCost,
    };


    try {
      const response = await axios.post(
        "http://localhost:3000/api/order",
        orderData
      );
      if (response.status === 200) {
        console.log("Order placed successfully");
        alert("Order placed successfully");

        // Send 'orderReceived' event to server via Socket.IO
        socket.emit("orderReceived", orderData);

        // Reset state values
        setSelectedVehicle("");
        setSelectedBookingStatus("");
        setPickupLocationInput("");
        setDropoffLocationInput("");
        setPickupLocation(null);
        setDropoffLocation(null);
        setSelectedDateTime(null);
        setTotalDistance(0); // Reset total distance
      setTotalCost(0); // Reset total cost
      setShowOrderConfirmation(false); // Hide order confirmation
      } else {
        console.error("Failed to place order:", response.statusText);
        alert("Failed to place order. Please try again later.");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Error placing order. Please try again later.");
    }
  };

  const handleViewOnGoogleMaps = () => {
    if (pickupLocation && dropoffLocation) {
      const pickupCoords = `${pickupLocation.lat},${pickupLocation.lng}`;
      const dropoffCoords = `${dropoffLocation.lat},${dropoffLocation.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${pickupCoords}&destination=${dropoffCoords}`;
      window.open(url, "_blank");
    }
  };

  const handleRetry = () => {
    setShowAlert(false); // ลบ showAlert ออกไป
    // เรียกใช้ฟังก์ชันหรือเมธอดอื่น ๆ ที่คุณต้องการเมื่อกด Retry
  };

  return (
    <>
      <NavbarCUS />
      
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          {/* Left Panel */}
          <div className="w-full md:w-1/4 bg-white p-4 flex flex-col">
            {/* Current User Information */}
            <div className="container mx-auto p-4">
              <h2 className="text-2xl font-bold mb-4">
                Current User Information
              </h2>
              {currentUserInfo && (
                <div>
                  <p>User: {currentUserInfo.user}</p>
                  <p>Email: {currentUserInfo.email}</p>
                  <p>License Plate: {currentUserInfo.licensePlate}</p>
                  <p>Phone Number: {currentUserInfo.phoneNumber}</p>
                </div>
              )}
            </div>
            {/* Vehicle selection */}
            <div className="mb-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="vehicle"
              >
                Select Vehicle
              </label>
              <select
                id="vehicle"
                className="w-full p-2 border border-gray-300 rounded-md "
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <option value="">Select Vehicle</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="3-Wheeler">3-Wheeler</option>
                <option value="Pickup Truck">Pickup Truck</option>
                <option value="6-Wheeler-Truck">6-Wheeler-Truck</option>
              </select>
            </div>
            {/* Booking status selection */}
            <div style={{ marginTop: "50px" }}>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="bookingStatus"
              >
                Select Booking
              </label>
              {/* Booking status buttons */}
              <div className="flex flex-wrap">
                <div
                  className={`border border-gray-300 rounded-md mb-4 p-2 cursor-pointer ${
                    selectedBookingStatus === "Urgent"
                      ? "bg-yellow-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleBookingStatusChange("Urgent")}
                >
                  Urgent
                </div>
                <div
                  className={`border border-gray-300 rounded-md mb-4 p-2 cursor-pointer ${
                    selectedBookingStatus === "Scheduled"
                      ? "bg-green-700 text-white"
                      : ""
                  }`}
                  onClick={() => handleBookingStatusChange("Scheduled")}
                >
                  {selectedBookingStatus === "Scheduled" ? (
                    <>
                      Scheduled:{" "}
                      {selectedDateTime
                        ? moment(selectedDateTime)
                            .locale("th")
                            .format("YYYY-MM-DD T HH:mm")
                        : "กรุณาเลือกเวลา"}
                    </>
                  ) : (
                    "Scheduled"
                  )}
                </div>
                {selectedBookingStatus === "Scheduled" && (
                  <input
                    type="datetime-local"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-green-500 text-white"
                    value={
                      selectedDateTime
                        ? moment(selectedDateTime)
                            .locale("th")
                            .format("YYYY-MM-DDTHH:mm")
                        : ""
                    }
                    onChange={(e) => setSelectedDateTime(e.target.value)}
                  />
                )}
                <div
                  className={`border border-gray-300 rounded-md mb-4 p-2 cursor-pointer ${
                    selectedBookingStatus === "Full Day"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleBookingStatusChange("Full Day")}
                >
                  Full Day
                </div>
              </div>
            </div>
            {/* Calculate route button */}
            {/* Location input */}
            <div style={{ marginTop: "50px" }}>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="pickup-input"
              >
                Select Location
              </label>
              <input
                id="pickup-input"
                type="text"
                placeholder="Enter pick-up location"
                className="w-full p-2 border border-gray-300 rounded-md mb-4 "
                value={pickupLocationInput}
                onChange={(e) => setPickupLocationInput(e.target.value)}
              />
              <input
                id="dropoff-input"
                type="text"
                placeholder="Enter drop-off location"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                value={dropoffLocationInput}
                onChange={(e) => setDropoffLocationInput(e.target.value)}
              />
              {/* Clear location buttons */}
              {pickupLocation && (
                <button
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={clearPickupLocation}
                >
                  Clear Pick-up Location
                </button>
              )}
              {dropoffLocation && (
                <button
                  className="w-full mt-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={clearDropoffLocation}
                >
                  Clear Drop-off Location
                </button>
              )}
              {/* Confirm order button */}
              <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Confirm Order
              </button>
              <button
                className="mb-20 w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={calculateRoute}
              >
                Calculate Route
              </button>
              {showAlert && (
                <div onClick={handleRetry} role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Notification: order again
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>คำสั่งของคุณถูกยกเลิกโดยคนขับ</p>
                    <button>Retry</button>
                  </div>
                </div>
              )}
              {pickupLocation && dropoffLocation && (
                <button
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleViewOnGoogleMaps}
                >
                  View on Google Maps
                </button>
              )}
            </div>
          </div>
          {/* Map */}
          <div
            className="w-full md:w-3/4"
            id="map"
            style={{ height: "100vh" }}
          ></div>
          {/* Order confirmation */}
          {showOrderConfirmation && (
            <div className="fixed bottom-0 left-0 bg-white p-4 w-full">
              <p>Vehicle: {selectedVehicle}</p>
              <p>
                Booking Status:{" "}
                {selectedBookingStatus === "Scheduled"
                  ? moment(selectedDateTime)
                      .locale("th")
                      .format("YYYY-MM-DD[T]HH:mm")
                  : selectedBookingStatus}
              </p>
              {pickupLocation && (
                <p>
                  Pickup Location: {pickupLocation.name} (Latitude:{" "}
                  {pickupLocation.lat}, Longitude: {pickupLocation.lng})
                </p>
              )}
              {dropoffLocation && (
                <p>
                  Drop-off Location: {dropoffLocation.name} (Latitude:{" "}
                  {dropoffLocation.lat}, Longitude: {dropoffLocation.lng})
                </p>
              )}
              <p>
                Selected DateTime:{" "}
                {moment(selectedDateTime)
                  .locale("th")
                  .format("YYYY-MM-DD HH:mm")}
              </p>
              <p>Total Distance: {totalDistance.toFixed(2)} km</p>
              <p>Total Cost: {totalCost.toFixed(2)} Baht</p>
              <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div style={{borderRadius: '50px'}} className="fixed bottom-0 left-0 w-full bg-blue-100 text-black p-4 transition-transform duration-300 transform scale-100 hover:scale-105 hover:-translate-y-2 overflow-auto">
  <div className="container mx-auto">
    <FollowDriverComponent />
  </div>
</div>





    
    </>
  );
}

export default CustomerComponent;
