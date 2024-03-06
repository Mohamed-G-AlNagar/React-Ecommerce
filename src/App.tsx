import React, { ReactElement } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

import MainLayout from './Components UI/MainLayout/MainLayOut';
import Home from './Components UI/Home/Home';
import NotFound from './Components UI/NotFound/NotFound';
import Login from './Components UI/login/Login';
import Signup from './Components UI/signup/Signup';
import Cart from './Components UI/cart/cart';
import ProductDetails from './Components UI/productDetails/ProductDetails';
import ProtectedRoutes from './ProtectRoutes/ProtectRoutes';

type RouteObject = {
  path: string;
  element: ReactElement;
  children?: RouteObject[];
};
// prettier-ignore
const routes: RouteObject[] = [
  {path: "",element: <MainLayout />,children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <ProtectedRoutes> <Cart /></ProtectedRoutes> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
