import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContextProvider";
export const OpenLayout = () => {
  const { getUser } = useUserContext();

  const asyncCheck = async () => {
    await getUser();
  };

  useEffect(() => {
    asyncCheck();
  }, []);
  return <Outlet />;
};
