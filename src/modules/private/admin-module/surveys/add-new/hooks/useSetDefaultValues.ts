import { useMemo } from "react";
import { AccessPointFormValues, NetworkFormValues } from "../types";

export const useSetDefaultValues = (
  accessPointInfo?: Partial<AccessPointFormValues>,
  currentNetwork?: NetworkFormValues
): { defaultValues: AccessPointFormValues } => {
  const defaultValues = useMemo(() => {
    return {
      name: accessPointInfo?.name ?? "",
      deviceId: accessPointInfo?.deviceId ?? 0,
      ip: accessPointInfo?.ip ?? "",
      network: {
        id: currentNetwork?.id ?? "0",
        name: currentNetwork?.name ?? "",
        ssid: currentNetwork?.ssid ?? "",
        countryCode: currentNetwork?.countryCode ?? "",
        wireless: {
          id: currentNetwork?.wireless?.id ?? "0",
          vht: currentNetwork?.wireless?.vht ?? false,
          acs: currentNetwork?.wireless?.acs ?? false,
          beaconInterval: currentNetwork?.wireless?.beaconInterval ?? 0,
          rtsCtsThreshold: currentNetwork?.wireless?.rtsCtsThreshold ?? 0,
        },
        security: {
          id: currentNetwork?.security?.id ?? "0",
          wirelessSecurityType:
            currentNetwork?.security?.wirelessSecurityType ?? "0", // TYPE-TODO: add enum from backend types
          radius: currentNetwork?.security?.radius ?? "",
          eap: currentNetwork?.security?.eap ?? false,
          macACLType: currentNetwork?.security?.macACLType ?? "0", // TYPE-TODO: add enum from backend types
          macACL: currentNetwork?.security?.macACL ?? undefined,
        },
      },
    };
  }, [accessPointInfo, currentNetwork]);

  return { defaultValues };
};
