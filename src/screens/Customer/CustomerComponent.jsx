/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/th";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarCUS from "./NavbarCUS";
import FollowDriverComponent from "./FollowDriverComponent";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";

const socket = io("http://localhost:3000");
const googleMapsApiKey = "AIzaSyAp5OleyH2H46AGS4kFoPvVu2SDZqkg-hCz5nc"; // Replace with your Google Maps API key
//const googleMapsApiKey = "AIzaSyAp5OleyH2H46AGS4kFoPvVu2SDZqCz5nc"; // แทนด้วย API key ของคุณ

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
  const [clickCount, setClickCount] = useState(0);

  const navigate = useNavigate();

  const costPerKm = {
    "จักรยานยนต์": 10,
    "รถ 3 ล้อ": 15,
    "รถกระบะ": 25,
    "รถบรรทุก 6 ล้อ": 30
  };
  useEffect(() => {
    const handleOrderCancelled = () => {
      setShowAlert(true);
    };

    socket.on("orderCancelled", handleOrderCancelled);

    return () => {
      socket.off("orderCancelled", handleOrderCancelled);
    };
  }, []);

  useEffect(() => {
    const handleOrderAccepted = () => {
      alert("คนขับได้ตอบรับ Order เรียบร้อยแล้ว.");
    };

    socket.on("orderAccepted", handleOrderAccepted);

    return () => {
      socket.off("orderAccepted", handleOrderAccepted);
    };
  }, []);

  // Fetch place name from coordinates using react-geocode
  useEffect(() => {
    const fetchPlaceName = async () => {
      try {
        const response = await Geocode.fromLatLng(
          pickupLocation.lat,
          pickupLocation.lng
        );
        const address = response.results[0].formatted_address;
        console.log("Pickup location address:", address);
      } catch (error) {
        console.error("Error fetching place name:", error);
      }
    };

    if (pickupLocation) {
      fetchPlaceName();
    }
  }, [pickupLocation]);

  useEffect(() => {
    const handleJobFinished = () => {
      navigate("/SuccessCustomer");
    };

    socket.on("jobFinished", handleJobFinished);

    return () => {
      socket.off("jobFinished", handleJobFinished);
    };
  }, []);

  useEffect(() => {
    socket.on("currentUserInfo", (userInfo) => {
      setCurrentUserInfo(userInfo);
    });

    return () => {
      socket.off("currentUserInfo");
    };
  }, []);

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
          const totalCost = totalDistanceInKm * 25;

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
        document.getElementById("pickup-input"),
        {
          fields: ["place_id", "geometry", "name"], // ระบุฟิลด์ที่ต้องการรับข้อมูล
          
          componentRestrictions: { country: "th" }, // จำกัดสถานที่ให้แสดงเฉพาะในประเทศไทย
        }
      );
    
      const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("dropoff-input"),
        {
          fields: ["place_id", "geometry", "name"], // ระบุฟิลด์ที่ต้องการรับข้อมูล
         
          componentRestrictions: { country: "th" }, // จำกัดสถานที่ให้แสดงเฉพาะในประเทศไทย
        }
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
        setPickupLocationInput(place.name);
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
        setDropoffLocationInput(place.name);
        setDropoffMarker(marker);
      });
    };
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&language=th`;
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

  const handleSubmit = async () => {
    // Calculate cost based on selected vehicle type
    let costPerKm = 0;
    switch (selectedVehicle) {
      case "จักรยานยนต์":
        costPerKm = 0;
        break;
      case "รถ 3 ล้อ":
        costPerKm = 10;
        break;
      case "รถกระบะ":
        costPerKm = 15;
        break;
      case "รถบรรทุก 6 ล้อ":
        costPerKm = 20;
        break;
      default:
        costPerKm = 0;
    }
  
    // Calculate total cost
    const totalCost = totalDistance * costPerKm;
  
    const orderData = {
      vehicle: selectedVehicle,
      bookingStatus:
        selectedBookingStatus === "Scheduled"
          ? moment(selectedDateTime)
              .locale("th")
              .format("วันที่ DD-MM-YYYY เวลา HH:mm")
          : selectedBookingStatus,
      pickupLocation,
      dropoffLocation,
      selectedDateTime,
      totalDistance,
      totalCost,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/booking",
        orderData
      );
      if (response.status === 200) {
        console.log("Order placed successfully");
        alert("โปรดรอสักครู่กำลังค้นหาคนขับ...");
  
        socket.emit("orderReceived", orderData);
  
        setSelectedVehicle("");
        setSelectedBookingStatus("");
        setPickupLocationInput("");
        setDropoffLocationInput("");
        setPickupLocation(null);
        setDropoffLocation(null);
        setSelectedDateTime(null);
        setTotalDistance(0);
        setTotalCost(0);
        setShowOrderConfirmation(false);
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
    setShowAlert(false);
  };

  return (
    <>
      <NavbarCUS />
      <div className="flex flex-col h-screen">
        <div className="flex flex-1">
          <div className="w-full md:w-1/4 bg-white p-4 flex flex-col">
            <div className="container mx-auto p-4">
              <h2 className="text-2xl font-bold mb-4">สั่ง Order</h2>
              {currentUserInfo && (
                <div>
                  <p>ผู้ใช้: {currentUserInfo.user}</p>
                  <p>อีเมล: {currentUserInfo.email}</p>
                </div>
              )}
            </div>
            <div style={{ marginTop: "2px" }}>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="pickup-input"
              >
                เลือกสถานที่รับ
              </label>
              <input
                id="pickup-input"
                type="text"
                placeholder="กรอกสถานที่รับสินค้า"
                className="w-full p-2 border border-gray-300 rounded-md mb-4 "
                value={pickupLocationInput}
                onChange={(e) => setPickupLocationInput(e.target.value)}
              />
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="dropoff-input"
              >
                เลือกสถานที่ส่ง
              </label>
              <input
                id="dropoff-input"
                type="text"
                placeholder="กรอกสถานที่ส่งสินค้า"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                value={dropoffLocationInput}
                onChange={(e) => setDropoffLocationInput(e.target.value)}
              />
              {pickupLocation && (
                <button
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={clearPickupLocation}
                >
                  ล้างสถานที่รับสินค้า
                </button>
              )}
              {dropoffLocation && (
                <button
                  className="w-full mt-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={clearDropoffLocation}
                >
                  ล้างสถานที่ส่งสินค้า
                </button>
              )}
              {/* <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                ยืนยันการสั่งซื้อ
              </button> */}
              <button
                style={{ marginTop: "10px" }}
                className="mb-20 w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={calculateRoute}
              >
                คำนวณเส้นทาง
              </button>
              {showAlert && (
                <div onClick={handleRetry} role="alert">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    แจ้งเตือน: สั่งซื้ออีกครั้ง
                  </div>
                  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>คำสั่งของคุณถูกยกเลิกโดยคนขับ</p>
                    <button>ลองอีกครั้ง</button>
                  </div>
                </div>
              )}
              {pickupLocation && dropoffLocation && (
                <button
                  style={{ marginTop: "-10px" }}
                  className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleViewOnGoogleMaps}
                >
                  ดูบน Google Maps
                </button>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="bookingStatus"
              >
                เลือกการจอง
              </label>
              <div className="flex flex-wrap">
                <div
                  className={`mr-2 border border-gray-300 rounded-md mb-4 p-2 cursor-pointer ${
                    selectedBookingStatus === "ด่วน"
                      ? "bg-yellow-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleBookingStatusChange("ด่วน")}
                >
                  ด่วน
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
                      วางแผน:{" "}
                      {selectedDateTime
                        ? moment(selectedDateTime)
                            .locale("th")
                            .format("วันที่ DD-MM-YYYY เวลา HH:mm")
                        : "กรุณาเลือกเวลา"}
                    </>
                  ) : (
                    "จองล่วงหน้า"
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
                            .format("วันที่ DD-MM-YYYY เวลา HH:mm")
                        : ""
                    }
                    onChange={(e) => setSelectedDateTime(e.target.value)}
                  />
                )}
                <div
                  className={`text-center ml-2 flex-1 border border-gray-300 rounded-md mb-4 p-2 cursor-pointer ${
                    selectedBookingStatus === "เหมาเต็มวัน"
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleBookingStatusChange("เหมาเต็มวัน")}
                >
                  เหมาเต็มวัน
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px" }} className="mb-4">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="vehicle"
              >
                เลือกประเภทรถ
              </label>
              <select
                id="vehicle"
                className="w-full p-2 border border-gray-300 rounded-md "
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
              >
                <option value="">เลือกประเภท</option>
                <option value="จักรยานยนต์">จักรยานยนต์</option>
                <option value="รถ 3 ล้อ">รถ 3 ล้อ</option>
                <option value="รถกระบะ">รถกระบะ</option>
                <option value="รถบรรทุก 6 ล้อ">รถบรรทุก 6 ล้อ</option>
              </select>
            </div>
          </div>

          <div
            className="w-full md:w-3/4"
            id="map"
            style={{ height: "800px" }}
          ></div>

          <FollowDriverComponent className="absolute top-0 left-0 z-50 w-full border-red-500 rounded-full" />
          {showOrderConfirmation && (
  <div className="fixed bottom-0 left-0 bg-white p-4 w-full">
    <button
      className="absolute top-0 right-0 mr-4 mt-2 text-xl font-bold"
      onClick={() => setShowOrderConfirmation(false)}
    >
      X
    </button>
    <p>ประเภทรถ: {selectedVehicle}</p>
    <p>
      สถานะการจอง:{" "}
      {selectedBookingStatus === "Scheduled"
        ? moment(selectedDateTime)
            .locale("th")
            .format("วันที่ DD-MM-YYYY เวลา HH:mm")
        : selectedBookingStatus}
    </p>
    {pickupLocation && <p>สถานที่รับสินค้า: {pickupLocation.name}</p>}
    {dropoffLocation && (
      <p>สถานที่ส่งสินค้า: {dropoffLocation.name}</p>
    )}
    <p>ระยะทางทั้งหมด: {totalDistance.toFixed(2)} กิโลเมตร</p>
    {/* Calculate total cost based on selected vehicle type */}
    {selectedVehicle && (
      <p>
        ราคารวม:{" "}
        {(totalDistance * costPerKm[selectedVehicle]).toFixed(2).toLocaleString("th-TH")} บาท
      </p>
    )}
    <button
      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSubmit}
    >
      ยืนยันการสั่งซื้อ
    </button>
  </div>
)}


        </div>
      </div>
    </>
  );
}

export default CustomerComponent;
