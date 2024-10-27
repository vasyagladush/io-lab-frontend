import { Route, Routes, useNavigate } from "react-router-dom";
// import { lazy } from "react";
import { SuspenseLoader } from "../../../components/suspense-loader/SuspenseLoader";
import { Button } from "flowbite-react";
import { useAdminAccessCheck } from "../hooks/useAdminAccessCheck";
import { NavigationAppRoutes } from "../../../constants/navigation-routes";
import { useEffect } from "react";
// import { TableContextProvider } from "../../../components/ui-kit/ReactTable/context/TableContext";

// const AccessPointsModule = lazy(async () => await import("./surveys"));

const InventoryModule = () => {
  const { checkAdminAccess } = useAdminAccessCheck();
  const navigate = useNavigate();

  const asyncCheck = async () => {
    if (!(await checkAdminAccess())) {
      navigate(NavigationAppRoutes.Private.Surveys.INDEX);
    }
  };

  useEffect(() => {
    asyncCheck();
  }, []);

  return (
    // <TableContextProvider>
    <Routes>
      <Route
        path="/*"
        element={
          <SuspenseLoader>
            <p>ADMIN</p>
            <Button>ads</Button>
            {/* <AccessPointsModule /> */}
          </SuspenseLoader>
        }
      />
    </Routes>
    // </TableContextProvider>
  );
};

export default InventoryModule;
