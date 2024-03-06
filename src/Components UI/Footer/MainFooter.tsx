import React from "react";

import { Link } from "react-router-dom";

export default function MainFooter() {
  return (
    <footer className="bg-light text-center py-3">
      <div className="container">
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to="/">Home</Link>
          </li>
          <li className="list-inline-item">
            <Link to="product">Products</Link>
          </li>
          <li className="list-inline-item">
            <Link to="category">Categories</Link>
          </li>
          <li className="list-inline-item">
            <Link to="brand">Brands</Link>
          </li>
          <li className="list-inline-item">
            <Link to="about">About</Link>
          </li>
          <li className="list-inline-item">
            <Link to="contact">Contact</Link>
          </li>
          <li className="list-inline-item">
            <Link to="appSetting">App Settings</Link>
          </li>
          <li className="list-inline-item">
            <Link to="profileSetting">Profile Settings</Link>
          </li>
          <li className="list-inline-item">
            <Link to="webSetting">Web Settings</Link>
          </li>
        </ul>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
