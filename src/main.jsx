/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./index.css";
import Home from "./components/Home/Home.jsx";
import Service from "./components/Service/Service.jsx";
import About from "./components/About/About.jsx";
import CustomerMain from "./screens/Customer/CustomerComponent.jsx";
import Login from "./screens/Loing-Register/Login.jsx";
import RegisterDriver from "./screens/Loing-Register/RegisterDriver.jsx";
import RegisterCustomer from "./screens/Loing-Register/RegisterCustomer.jsx";
import UI_select from "./screens/Loing-Register/UI_select.jsx";
import ForgotPassword from "./screens/Loing-Register/ForgotPassword.jsx";
import Play_select from "./screens/Loing-Register/Play_select.jsx";
import CustomerComponent from "./screens/Customer/CustomerComponent.jsx";
import DriverComponent from "./screens/Service/DriverComponent.jsx";
import Mab from "./screens/Customer/Mab.jsx";
import SuccessPage from "./screens/Service/SuccessPage.jsx";

import SuccessCustomer from "./screens/Customer/SuccessCustomer.jsx";
import NavbarSV from "./screens/Service/NavbarSV.jsx";
import NavbarCUS from "./screens/Customer/NavbarCUS.jsx";
import FollowDriverComponent from "./screens/Customer/FollowDriverComponent.jsx";
import FollowCustomer from "./screens/Service/FollowCustomer.jsx";
import Booking from "./screens/Customer/Booking.jsx";
import BookingSV from "./screens/Service/BookingSV.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "service",
    element: <Service />
  },
  {
    path: "about",
    element: <About />
  },
  {
    path: "CustomerMain",
    element: <CustomerMain />
  },
  {
    path: "Login",
    element: <Login />
  },
  {
    path: "RegisterDriver",
    element: <RegisterDriver />
  },
  {
    path: "RegisterCustomer",
    element: <RegisterCustomer />
  },
  {
    path: "UI_select",
    element: <UI_select />
  },
  {
    path: "ForgotPassword",
    element: <ForgotPassword />
  },
  {
    path: "Play_select",
    element: <Play_select />
  },
  {
    path: "CustomerComponent",
    element: <CustomerComponent />
  },
  {
    path: "DriverComponent",
    element: <DriverComponent />
  },
  {
    path: "Mab",
    element: <Mab />
  },
  {
    path: "SuccessPage",
    element: <SuccessPage />
  },
  {
    path: "FollowDriverComponent",
    element: <FollowDriverComponent />
  },
  {
    path: "SuccessCustomer",
    element: <SuccessCustomer />
  },
  {
    path: "NavbarSV",
    element: <NavbarSV />
  },
  {
    path: "NavbarCUS",
    element: <NavbarCUS />
  },
  {
    path: "FollowCustomer",
    element: <FollowCustomer />
  },
  {
    path: "Booking",
    element: <Booking />
  },
  {
    path: "BookingSV",
    element: <BookingSV />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
