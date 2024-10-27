import { useState } from "react";
import { useUserContext } from "../../../../contexts/UserContextProvider";
import api from "../../../../utils/api";

export const useSignIn = () => {
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const signIn = async (username: string, password: string) => {
    setLoading(true);
    const accessToken = (await api.login({ username, password })).accessToken;
    const user = await api.getCurrentUser();
    setUser(user);
    setLoading(false);
    return { user, accessToken };
  };

  const updateLoading = (val: boolean) => {
    setLoading(val);
  };
  return { signIn, loading, updateLoading };
};
