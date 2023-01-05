import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Turtle Pizza</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/admin/dishes" className="nav-link">
                Dishes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;