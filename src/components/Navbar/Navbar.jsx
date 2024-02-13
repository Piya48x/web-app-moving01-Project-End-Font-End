import { Link } from "react-router-dom";
import './styes.css'

const navbarStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  backgroundColor: "rgba(255, 255, 255, 0.0)",
  display: "flex",
  marginTop: "15px",
  color: "#000",
  fontWeight: "bold",
};

function Navbar() {
  return (
    <div  style={navbarStyle}>
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl" style={{ fontWeight: "bold" }}>
          Moving For Items
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {/* <li>
            <Link to="/RegisterDriver">Driver</Link>
          </li> */}
          <li>
            <Link to="/Login">Login</Link>
            {/* <Link to="/CustomerComponent">Login</Link> */}
          </li>
          <li>
            <Link to="/UI_select">Register</Link>
            {/* <Link to="/DriverComponent">Customer</Link> */}
            
          </li>
          <li>
            <details>
              <summary>Contart</summary>
              <ul className="text-white p-2 bg-base-100 rounded-t-none">
                <li>
                  <a href="https://cs.rmu.ac.th/csweb2019/">CS 63</a>
                </li>
                <li>
                  <a href="https://regis.rmu.ac.th">RMU</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
