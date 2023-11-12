import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { DoLogout } from "../Authentication";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
// import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "../Icons";
// import CodeIcon from '../Icons/code-bold.svg'
// import HamburgetMenuOpen from '../Icons/close-fill.svg'
// import HamburgetMenuClose from '../Icons/hamburger-lg.svg'


function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to log out?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, LogOut'
    }).then((result) => {
      if (result.isConfirmed) {
        DoLogout();
        navigate("/login");
      }
    })
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>RBAC</span>
            {/* <i className="fas fa-code"></i> */}
            {/* <span className="icon">
              <CodeIcon />
            </span> */}
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/dashboard"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/hierarchy"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Hierarchy
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/users"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/projects"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Project
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/teams"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <Button activeClassName="active"
                style={{ "background": "transparent", "border": "none" }} className="nav-links" onClick={handleLogout}>Logout</Button>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                {/* <HamburgetMenuOpen />{" "} */}
              </span>
            ) : (
              <span className="icon">
                {/* <HamburgetMenuClose /> */}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;