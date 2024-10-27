import Api from "../../../../../../util/api";
import { useState } from "react";
import {
  transformAccessPointFormValuesToServer,
  transformMacAclToServerInput,
  transformNetworkToServerInput,
  transformSecurityToServerInput,
  transformWirelessToServerInput,
} from "../data-transformers/access-points";
import { AccessPointFormValues } from "../types";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../../hooks/useNotification";

export const useUpdateAccessPoint = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const updateAccessPoint = async (
    accessPointId: string,
    formData: AccessPointFormValues
  ) => {
    try {
      setLoading(true);
      const accessPointData = transformAccessPointFormValuesToServer(formData);
      await Api.updateAccessPoint(accessPointId, accessPointData);
      showNotification(
        "Access point updated succesfully",
        NotificationTypes.INFO
      );

      const networkData = transformNetworkToServerInput(formData);
      await Api.updateNetwork(formData.network.id, networkData);
      showNotification(
        "Network updated succesfully",
        NotificationTypes.INFO
      );

      const wirelessData = transformWirelessToServerInput(formData);
      await Api.updateWireless(formData.network.wireless.id, wirelessData);
      showNotification(
        "Wireless updated succesfully",
        NotificationTypes.INFO
      );

      const securityData = transformSecurityToServerInput(formData);
      await Api.updateSecurity(formData.network.security.id, securityData);
      showNotification(
        "Security updated succesfully",
        NotificationTypes.INFO
      );

      if (formData.network.security.macACL) {
        const macAclData = transformMacAclToServerInput(formData);
        await Api.updateMacAcl(formData.network.security.macACL.id, macAclData);
        showNotification(
          "MAC ACL updated succesfully",
          NotificationTypes.INFO
        );
      }

      showNotification(
        "Update has finished succesfully",
        NotificationTypes.SUCCESS
      );
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      showNotification(
        e?.error?.message ?? "Something went wrong",
        NotificationTypes.WARNING
      );
    }
    setLoading(false);
  };
  return { updateAccessPoint, loading };
};
