import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGetUser } from "../hooks/useGetUser";
import { components } from "../utils/backend-api-types";
type UserApiType = components["schemas"]["UserSchema"];

interface IUserContext {
  getUser: () => Promise<UserApiType | null>;
  setUser: (data: UserApiType) => void;
  clearUser: () => void;
  refreshUserData: () => void;
}

const UserContext = createContext<IUserContext>({
  getUser: async () => null,
  setUser: () => null,
  clearUser: () => null,
  refreshUserData: () => null,
});

export const UserContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const { userData: user, refreshUserData, getUser } = useGetUser();
  const [userData, setUserData] = useState<UserApiType | null>(null);

  const handleUserGet = async () =>{
    return userData ?  userData : await getUser();
  }

  const handleUserUpdate = (data: UserApiType) => {
    setUserData(data);
  };

  const handleUserClear = () => {
    setUserData(null);
  };

  useEffect(() => {
    user ? handleUserUpdate(user) : handleUserClear();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        getUser: handleUserGet,
        setUser: handleUserUpdate,
        clearUser: handleUserClear,
        refreshUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
