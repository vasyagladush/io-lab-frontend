import { useState } from "react";
import api from "../../../../../utils/api";
import { components } from "../../../../../utils/backend-api-types";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";

export const useGetSurvey = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [surveyData, setSurveyData] = useState<
    components["schemas"]["SurveyPlusSchema"] | null
  >(null);

  const getSurvey = async (id: string) => {
    let result: components["schemas"]["SurveyPlusSchema"] | null;
    setLoading(true);
    try {
      result = await api.getSurvey(id);
    } catch (e: any) {
      setLoading(false);
      showNotification("Failed to fetch surveys", NotificationTypes.DANGER);
      result = null;
    }
    setSurveyData(result);
    setLoading(false);
    return result;
  };

  return { loading, getSurvey, surveyData };
};
