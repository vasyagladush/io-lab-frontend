import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SuspenseLoader } from "../../components/suspense-loader/SuspenseLoader";
import { PrivateLayout } from "../../components/private-layout/PrivateLayout";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { LoadingBlock } from "../../components/loading-block/LoadingBlock";

// In this file we will determine which modules the user has access to,
// where they are allowed to navigate and which modules should be rendered for him.
// Also here we will instantiate the main layout

// This is an example of using lazy loading for modules

const SurveysModule = lazy(async () => await import("./surveys-module"));
const AdminModule = lazy(async () => await import("./admin-module"));

const PrivateModule = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateLayout />}>
        <Route
          path="admin/*"
          element={
            <SuspenseLoader>
              <AdminModule />
            </SuspenseLoader>
          }
        />
        <Route
          path="surveys/*"
          element={
            <SuspenseLoader>
              <SurveysModule />
            </SuspenseLoader>
          }
        />
      </Route>
    </Routes>
  );
};

export default PrivateModule;
