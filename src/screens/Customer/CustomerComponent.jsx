import React, { useState, useEffect } from "react";

// Define your Google Maps API key
const googleMapsApiKey = "AIzaSyDCLtYSgJKmcFtspJRbjQ8wqjvhHLzNVhE";

function CustomerComponent() {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);

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

  const clearPickupLocation = () => {
    setPickupLocation(null);
    document.getElementById("pickup-input").value = "";

    if (pickupMarker) {
      pickupMarker.setMap(null);
    }
  };

  const clearDropoffLocation = () => {
    setDropoffLocation(null);
    document.getElementById("dropoff-input").value = "";

    if (dropoffMarker) {
      dropoffMarker.setMap(null);
    }
  };

  return (
    <>
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
    
     
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
     <div style={{ display: "flex" }}>
        <div className="w-80 flex flex-col items-center justify-center h-screen">
          <h2>Customer Component</h2>
          <select
           
            className="my-4 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Vehicle</option>
            <option value="Car">Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
          </select>
          <select
          
          >
            <option value="">Select Booking Status</option>
            <option value="Urgent">Urgent</option>
            <option value="Advance Booking">Advance Booking</option>
            <option value="Full Day Charter">Full Day Charter</option>
          </select>
        
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Place Order
          </button>
        </div>
        <div >
        <div >
          <input
            id="pickup-input"
            type="text"
            placeholder="Enter pick-up location"
            className="mt-0 my-4 p-2 border border-blue-300 rounded-md bg-white text-black"
          />
          <input
            id="dropoff-input"
            type="text"
            placeholder="Enter drop-off location"
            className="mt-0 my-4 p-2 border border-blue-300 rounded-md bg-white text-black"
          />
        </div>
      
        <div id="map" style={{ height: "100%", width: "359%" }}></div>

       

        {pickupLocation && (
          <button onClick={clearPickupLocation}>Clear Pick-up Location</button>
        )}
        {dropoffLocation && (
          <button onClick={clearDropoffLocation}>
            Clear Drop-off Location
          </button>
        )}
      </div>
      </div>
     
    </>
  );
}

export default CustomerComponent;
