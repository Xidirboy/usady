import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../components/Home"));
const NotFount = lazy(() => import("../components/NotFount"));

const Routers = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense>
            <NotFount />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default Routers;
