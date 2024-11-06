import { useState } from "react";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";
import api from "../../../../../utils/api";

export const useDownloadReport = () => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const downloadReport = async (
    surveyId: string
  ): Promise<null> => {
    try {
      setLoading(true);
      const result = await api.downloadReport(surveyId);

      // Create a download link and simulate a click to trigger the download
      const url = window.URL.createObjectURL(result.blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", result.fileName); // Set the dynamic filename

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link); // Cleanup the link element
      window.URL.revokeObjectURL(url); // Free up the object URL
    } catch (e: any) {
      console.error(e);
      showNotification(
        e?.error?.message ?? "Something went wrong",
        NotificationTypes.DANGER
      );
    }
    setLoading(false);
    return null;
  };

  return { loading, downloadReport };
};
