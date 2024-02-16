import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}


// Driver component
function DriverComponent() {
  const [driverLocation, setDriverLocation] = useState(null);
  const [order, setOrder] = useState(null);

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

  return (
    <div>
      {/* Map component */}
      <Map
        initialCenter={driverLocation || { lat: 0, lng: 0 }}
        pickupLocation={order?.pickupLocation}
        dropoffLocation={order?.dropoffLocation}
      />

      {/* Display driver's location */}
      {driverLocation && (
        <p>
          Driver's Location: Latitude {driverLocation.lat}, Longitude{' '}
          {driverLocation.lng}
        </p>
      )}

      {/* Display order */}
      {order && (
        <div>
          <h2>Order Details</h2>
          <p>Vehicle: {order.vehicle}</p>
          <p>Booking Status: {order.bookingStatus}</p>
          {order.pickupLocation && <p>Pickup Location: {order.pickupLocation.name}</p>}
          {order.dropoffLocation && <p>Drop-off Location: {order.dropoffLocation.name}</p>}
          <p>Selected DateTime: {order.selectedDateTime}</p>
          <p>Total Distance: {order.totalDistance} km</p>
          <p>Total Cost: {order.totalCost} Baht</p>
        </div>
      )}
    </div>
  );
}

export default DriverComponent;
