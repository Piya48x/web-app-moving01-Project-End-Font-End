import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const DriverComponent = () => {
  const [newOrder, setNewOrder] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    // Event listener for receiving newOrder event from server
    socket.on("newOrder", (order) => {
      setNewOrder(order); // Update newOrder state with received order
    });

    // Cleanup function to remove event listener
    return () => {
      socket.off("newOrder");
    };
  }, []);

  const handleConfirmOrder = () => {
    setConfirmedOrder(newOrder); // Set confirmedOrder state with newOrder
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2>New Order Received</h2>
        {newOrder && (
          <div>
            {!confirmedOrder && (
              <button onClick={handleConfirmOrder}>Confirm Order</button>
            )}
          </div>
        )}
        {confirmedOrder && (
          <div>
            <h3>Confirmed Order</h3>
            <p>Pickup Location: {confirmedOrder.pickupLocation}</p>
            <p>Destination: {confirmedOrder.destination}</p>
            <p>Selected Vehicle: {confirmedOrder.selectedVehicle}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DriverComponent;
