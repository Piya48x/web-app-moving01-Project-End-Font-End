// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Assuming your server is running at http://localhost:3000
const socket = io('http://localhost:3000');

function FollowDriverComponent() {
  const [driverLocation, setDriverLocation] = useState(null);

  // Effect to listen for driver's location updates
  useEffect(() => {
    // Event listener when receiving 'driverLocationUpdate' event from the server
    const handleDriverLocationUpdate = (location) => {
      // Update driverLocation state with the new location
      setDriverLocation(location);
    };

    socket.on('driverLocationUpdate', handleDriverLocationUpdate);

    // Clean up socket listener
    return () => {
      socket.off('driverLocationUpdate', handleDriverLocationUpdate);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Following Driver</h1>
      {driverLocation && (
        <div>
          <p>Driver's Location: Latitude {driverLocation.lat}, Longitude {driverLocation.lng}</p>
          {/* You can display the driver's location on a map or any other UI component */}
        </div>
      )}
    </div>
  );
}

export default FollowDriverComponent;
