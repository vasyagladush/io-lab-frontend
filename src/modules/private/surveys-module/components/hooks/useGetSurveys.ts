import { useState } from "react";
import api from "../../../../../utils/api";
import { components } from "../../../../../utils/backend-api-types";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";

export const useGetSurveys = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [surveysData, setSurveysData] = useState<
    components["schemas"]["SurveyPlusSchema"][]
  >([]);

  const getSurveys = async () => {
    let result: components["schemas"]["SurveyPlusSchema"][];
    setLoading(true);
    try {
      result = await api.getCurrentSurveys();
    } catch (e: any) {
      setLoading(false);
      showNotification("Failed to fetch surveys", NotificationTypes.DANGER);
      result = [];
    }
    setSurveysData(result);
    setLoading(false);
    return result;
  };

  return { loading, getSurveys, surveysData };
};
