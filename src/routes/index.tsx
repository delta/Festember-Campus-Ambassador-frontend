import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { publicRoutes } from './routes';

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(route => (
          <Route element={route.component} path={route.url} key={route.url} />
        ))}
        {/* <Route path="/admin">
        {adminRoutes.map((route) => (
          <Route
            element={route.component}
            path={route.url}
            key={route.url}
          />
        ))}
      </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
