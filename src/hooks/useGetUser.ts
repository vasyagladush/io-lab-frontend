import { useEffect, useState } from "react";
import api from "../utils/api";
import { components } from "../utils/backend-api-types";
import { useNavigateParams } from "./useNavigateParams";
import { useSearchParams } from "react-router-dom";
import { NavigationAppRoutes } from "../constants/navigation-routes";

export const useGetUser = () => {
  const navigate = useNavigateParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<
    components["schemas"]["UserSchema"] | null
  >(null);

  const getUser = async () => {
    let result: components["schemas"]["UserSchema"] | null;
    setLoading(true);
    try {
      result = await api.getCurrentUser();
    } catch (e: any) {
      setLoading(false);
      navigate(NavigationAppRoutes.Open.Auth.SIGN_IN_START, searchParams);
      result = null;
    }
    setUserData(result);
    setLoading(false);
    return result;
  };

  const refreshUserData = () => {
    getUser();
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return { userData, loading, refreshUserData, getUser };
};
