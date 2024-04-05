import React, { Suspense, lazy } from "react";
import { Outlet, Route, Routes } from "react-router-dom"; 
import Layout from "../sections/layoutSections/Layout";

const Home = lazy(() => import("../components/main_pages/Home"));
const Profile = lazy(() => import("../components/profile_pages/Profile"));
const NotFount = lazy(() => import("../components/main_pages/NotFount"));

const Routers = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="/">
          <Route
            index
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
        </Route>
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
