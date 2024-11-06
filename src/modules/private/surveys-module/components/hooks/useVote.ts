import { useState } from "react";
import api from "../../../../../utils/api";
import { components } from "../../../../../utils/backend-api-types";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";

export const useVote = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const vote = async (data: components["schemas"]["GradeSchema"]) => {
    let result: components["schemas"]["GradeSchema"] | null;
    setLoading(true);
    try {
      result = await api.createGrade(data);
      showNotification("Successfully voted", NotificationTypes.SUCCESS);
    } catch (e: any) {
      setLoading(false);
      showNotification("Something went wrong", NotificationTypes.DANGER);
      result = null;
    }
    setLoading(false);
    return result;
  };

  return { loading, vote };
};
