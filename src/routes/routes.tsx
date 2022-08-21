import React from 'react';

import Home from '../pages/Home';
import Register from '../pages/Register';

export const publicRoutes = [
  {
    url: '/',
    component: <Home />,
    name: 'HomePage',
  },
  {
    url: '/register',
    component: <Register />,
    name: 'RegisterPage',
  },
];

export const adminRoutes = [];
