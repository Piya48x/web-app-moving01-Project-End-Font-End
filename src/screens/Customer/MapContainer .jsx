/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Autocomplete } from "@react-google-maps/api";

const MapContainer = (props) => {
  const [pickupPosition, setPickupPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  const handleMapClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const { lat, lng } = latLng.toJSON();

    if (props.selectingPickup) {
      setPickupPosition({ lat, lng });
      props.onPickupSelected({ lat, lng });
    } else {
      setDestinationPosition({ lat, lng });
      props.onDestinationSelected({ lat, lng });
    }
  };

  const handlePickupAutocomplete = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setPickupPosition({ lat, lng });
    props.onPickupSelected({ lat, lng });
  };
  
  const handleDestinationAutocomplete = (place) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setDestinationPosition({ lat, lng });
    props.onDestinationSelected({ lat, lng });
  };
  
  



  return (
    <>
    <Map
  google={props.google}
  zoom={14}
  initialCenter={{ lat: 13.7563, lng: 100.5018 }}
  onClick={handleMapClick}
>
  {pickupPosition && <Marker position={pickupPosition} label="Pickup Location" />}
  {destinationPosition && <Marker position={destinationPosition} label="Destination Location" />}
</Map>

      <div style={{ position: "absolute", top: 135, left: 329, zIndex: 100 }}>
        <Autocomplete
          onLoad={(autocomplete) => console.log(autocomplete)}
          onPlaceChanged={() => console.log("onPlaceChanged")}
          options={{ types: ["geocode"] }}
          onPlaceSelected={handlePickupAutocomplete}
          autocompleteOptions={{
            componentRestrictions: { country: "th" },
            types: ["establishment"],
          }}
          
        >
          <input
            type="text"
            placeholder="Enter Pickup Location"
            className="mt-0 my-4 p-2 border border-blue-300 rounded-md bg-white text-black"
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) => console.log(autocomplete)}
          onPlaceChanged={() => console.log("onPlaceChanged")}
          options={{ types: ["geocode"] }}
          onPlaceSelected={handleDestinationAutocomplete}
          autocompleteOptions={{
            componentRestrictions: { country: "th" },
            types: ["establishment"],
          }}
        >
          <input
            type="text"
            placeholder="Enter Destination Location"
            className="mt-0 my-4 p-2 border border-blue-300 rounded-md bg-white text-black"
          />
        </Autocomplete>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAp5OleyH2H46AGS4kFoPvVu2SDZqCz5nc",
})(MapContainer);
