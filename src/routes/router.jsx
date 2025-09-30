import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import NewArrivals from '../Pages/NewArrivals/NewArrivals';
import Offers from '../Pages/Sale/Offers';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import Cart from '../Pages/Cart/Cart';
import Products from '../Pages/Products/Products';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/products',
        Component: Products
      },
      {
        path: '/new-arrivals',
        Component: NewArrivals
      },
      {
        path: '/sale/offers',
        Component: Offers
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: Contact
      },
      {
        path: '/cart',
        Component: Cart
      }
    ]
  },
]);

export default router;