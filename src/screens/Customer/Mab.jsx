import { useState, useEffect } from 'react';

// Define your Google Maps API key
const googleMapsApiKey = 'AIzaSyDCLtYSgJKmcFtspJRbjQ8wqjvhHLzNVhE';

function Mab() {
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
      console.error('Error getting geolocation:', error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: currentPosition.lat, lng: currentPosition.lng },
        zoom: 15,
      });

      const pickupAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('pickup-input')
      );

      const dropoffAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('dropoff-input')
      );

      pickupAutocomplete.addListener('place_changed', () => {
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

      dropoffAutocomplete.addListener('place_changed', () => {
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

    const script = document.createElement('script');
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
    document.getElementById('pickup-input').value = '';

    if (pickupMarker) {
      pickupMarker.setMap(null);
    }
  };

  const clearDropoffLocation = () => {
    setDropoffLocation(null);
    document.getElementById('dropoff-input').value = '';

    if (dropoffMarker) {
      dropoffMarker.setMap(null);
    }
  };

  return (
    <div>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>

      <input
        id="pickup-input"
        type="text"
        placeholder="Enter pick-up location"
      />

      <input
        id="dropoff-input"
        type="text"
        placeholder="Enter drop-off location"
      />

      {pickupLocation && (
        <button onClick={clearPickupLocation}>Clear Pick-up Location</button>
      )}
      {dropoffLocation && (
        <button onClick={clearDropoffLocation}>Clear Drop-off Location</button>
      )}
    </div>
  );
}

export default Mab;