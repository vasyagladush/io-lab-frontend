import { useState } from "react";
import api from "../../../../../utils/api";
import { components } from "../../../../../utils/backend-api-types";

export const useCreateSurvey = () => {
  const [loading, setLoading] = useState(false);

  const createSurvey = async (data: components["schemas"]["SurveySchema"]) => {
    let result: components["schemas"]["SurveyPlusSchema"] | null;
    setLoading(true);
    try {
      result = await api.createSurvey(data);
    } catch (e: any) {
      setLoading(false);
      result = null;
    }
    setLoading(false);
    return result;
  };

  return { loading, createSurvey };
};
