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
import CustomerMain from "./screens/Customer/CustomerMain.jsx";
import Login from "./screens/Loing-Register/Login.jsx";
import RegisterDriver from "./screens/Loing-Register/RegisterDriver.jsx";
import RegisterCustomer from "./screens/Loing-Register/RegisterCustomer.jsx";
import UI_select from "./screens/Loing-Register/UI_select.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
