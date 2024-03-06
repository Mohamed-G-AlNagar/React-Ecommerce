import React from 'react';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainNavBar from '../Navbar/MainNavBar';

import MainFooter from '../Footer/MainFooter';

function MainLayOut() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MainNavBar />
      <div className="flex-grow-1 text-center my-0">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
}

export default MainLayOut;
