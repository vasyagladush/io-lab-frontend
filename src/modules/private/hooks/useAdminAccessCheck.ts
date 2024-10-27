import { useUserContext } from "../../../contexts/UserContextProvider";

export const useAdminAccessCheck = () => {
  const { getUser } = useUserContext();

  const checkAdminAccess = async () => {
    return (await getUser())?.isAdmin;
  };

  return { checkAdminAccess };
};
