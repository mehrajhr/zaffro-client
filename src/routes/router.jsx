import React from 'react';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Hello world</h1>,
  },
]);

export default router;