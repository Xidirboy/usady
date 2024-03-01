import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import Loading from "../sections/utilsSections/Loading";

// const DynamicPage = lazy(() => import("../components/DynamicPage"));
const OldInsurances = lazy(() =>
  import("../components/profile_pages/OldInsurances")
);
const NotFount = lazy(() => import("../components/NotFount"));
const News = lazy(() => import("../components/News"));
const Faqs = lazy(() => import("../components/Faqs"));
const NewView = lazy(() => import("../components/NewView"));
const Profile = lazy(() => import("../components/profile_pages/Profile"));
const MyInsurances = lazy(() =>
  import("../components/profile_pages/MyInsurances")
);
const Appeals = lazy(() => import("../components/profile_pages/Appeals"));
const HistoryPaid = lazy(() =>
  import("../components/profile_pages/HistoryPaid")
);
const Notification = lazy(() =>
  import("../components/profile_pages/Notification")
);
const Feedback = lazy(() => import("../components/profile_pages/Feedback"));
const Claims = lazy(() => import("../components/profile_pages/Claims")); 
const NotificationCommon = lazy(() =>
  import("../components/profile_pages/NotificationCommon")
); 

const Routers = () => {
  return (
    <Routes>
      <Route path="/news">
        <Route
          index
          element={
            <Suspense>
              <News />
            </Suspense>
          }
        />
        <Route
          path=":slug"
          element={
            <Suspense>
              <NewView />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="/faqs"
        element={
          <Suspense>
            <Faqs />
          </Suspense>
        }
      /> 
      <Route path="/profile">
        <Route
          index
          element={
            <Suspense>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="my-insurances"
          element={
            <Suspense>
              <MyInsurances />
            </Suspense>
          }
        />
        <Route
          path="my-insurances/old"
          element={
            <Suspense>
              <OldInsurances />
            </Suspense>
          }
        />
        <Route
          path="appeals"
          element={
            <Suspense>
              <Appeals />
            </Suspense>
          }
        />
        <Route
          path="history-paid"
          element={
            <Suspense>
              <HistoryPaid />
            </Suspense>
          }
        />
        <Route
          path="notification"
          element={
            <Suspense>
              <Notification />
            </Suspense>
          }
        />
        <Route
          path="notification-common"
          element={
            <Suspense>
              <NotificationCommon />
            </Suspense>
          }
        />
        <Route
          path="feedback"
          element={
            <Suspense>
              <Feedback />
            </Suspense>
          }
        />
        <Route
          path="claims"
          element={
            <Suspense>
              <Claims />
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
