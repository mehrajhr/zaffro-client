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
import ProductDetails from '../Pages/Products/ProductDetails';
import DashLayouts from '../Layouts/DashLayouts';
import Overview from '../Dashborad/Overview/Overview';
import ManageProducts from '../Dashborad/ManageProducts/ManageProducts';
import Orders from '../Dashborad/Orders/Orders';
import Users from '../Dashborad/Users/Users';
import AddProduct from '../Dashborad/ManageProducts/AddProduct';
import EditProduct from '../Dashborad/ManageProducts/EditProduct';
import Forbidden from '../Pages/Forbidden/Forbidden';
import AdminRoutes from './AdminRoutes';

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
      },
      {
        path: '/products/:id',
        Component: ProductDetails
      },
      {
        path: '/forbidden',
        Component: Forbidden
      }
    ]
  },
  {
    path: '/dashboard',
    element: <AdminRoutes><DashLayouts></DashLayouts></AdminRoutes>,
    children: [
      {
        index: true,
        element: <AdminRoutes> <Overview></Overview> </AdminRoutes>
      },
      {
        path: '/dashboard/manage-products',
        element: <AdminRoutes> <ManageProducts></ManageProducts></AdminRoutes>
      },
      {
        path: '/dashboard/orders',
        element: <AdminRoutes> <Orders></Orders> </AdminRoutes>
      },
      {
        path: '/dashboard/manage-users',
        element: <AdminRoutes> <Users></Users> </AdminRoutes>
      },
      {
        path: '/dashboard/add-product',
        element: <AdminRoutes> <AddProduct> </AddProduct> </AdminRoutes>
      },
      {
        path: '/dashboard/edit-product/:id',
        element: <AdminRoutes> <EditProduct></EditProduct> </AdminRoutes>
      }
    ]
  }
]);

export default router;