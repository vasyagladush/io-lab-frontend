import Api from "../../../../../../util/api";
import { useEffect, useState } from "react";
import { transformNetworkServerInputToFormValues } from "../data-transformers/access-points";
import { NetworkFormValues } from "../types";

export const useGetNetwork = (id?: string) => {
  const [loading, setLoading] = useState(false);
  const [networkFormInfo, setNetworkFormInfo] = useState<NetworkFormValues>();
  const getNetworkInfo = async (
    id?: string
  ): Promise<NetworkFormValues | undefined> => {
    try {
      setLoading(true);
      if (id) {
        const result = await Api.getNetwork(id);
        const formatted = transformNetworkServerInputToFormValues(result!);
        setLoading(false);
        setNetworkFormInfo(formatted);
        return formatted;
      }
    } catch (e: any) {
      console.error(e);
    }
  };
  useEffect(() => {
    getNetworkInfo();
  }, [id]);
  return {
    networkFormInfo,
    loading,
    refreshNetworkInfo: getNetworkInfo,
  };
};
