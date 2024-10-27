import { components } from "../../../../../../util/backend-api-types";
import {} from "../../../../../../util/types";
import { AccessPointFormValues, NetworkFormValues } from "../types";

export const transformAccessPointFormValuesToServer: (
  values: AccessPointFormValues
) => Partial<components["schemas"]["PutAPSchema"]> = (values) => {
  const forSubmit = {
    name: values.name,
  };

  return forSubmit;
};

export const transformNetworkToServerInput: (
  values: AccessPointFormValues
) => Partial<components["schemas"]["PutNetworkSchema"]> = (values) => {
  return {
    name: values.network.name,
    ssid: values.network.ssid,
    countryCode: values.network.countryCode,
  };
};

export const transformWirelessToServerInput: (
  values: AccessPointFormValues
) => Partial<components["schemas"]["PutWirelessSchema"]> = (values) => {
  return {
    vht: values.network.wireless.vht,
    acs: values.network.wireless.acs,
    beaconInterval: Number(values.network.wireless.beaconInterval),
    rtsCtsThreshold: Number(values.network.wireless.rtsCtsThreshold),
  };
};

export const transformSecurityToServerInput: (
  values: AccessPointFormValues
) => Partial<components["schemas"]["PutSecuritySchema"]> = (values) => {
  return {
    wirelessSecurityType: Number(values.network.security.wirelessSecurityType),
    radius: values.network.security.radius ?? undefined,
    eap: values.network.security.eap,
    macAclType: Number(values.network.security.macACLType),
  };
};

export const transformMacAclToServerInput: (
  values: AccessPointFormValues
) => Partial<components["schemas"]["PutMacAclSchema"]> = (values) => {
  return {
    macs: values.network.security.macACL?.macs.map((el) => el.mac),
  };
};

export const transformAccessPointServerInputToFormValues: (
  accessPoint: components["schemas"]["APSchema"]
) => Partial<AccessPointFormValues> = (accessPoint) => {
  return {
    name: accessPoint.name,
    deviceId: Number(accessPoint.deviceId),
    ip: accessPoint.ip,
    network: undefined,
  };
};

export const transformNetworkServerInputToFormValues: (
  accessPointNetwork: components["schemas"]["NetworkGigaSchema-Output"]
) => NetworkFormValues = (network) => {
  return {
    id: String(network.id),
    name: network.name,
    ssid: network.ssid,
    countryCode: network.countryCode,
    wireless: {
      id: String(network.wireless[0].id),
      vht: network.wireless[0].vht,
      acs: network.wireless[0].acs,
      beaconInterval: network.wireless[0].beaconInterval,
      rtsCtsThreshold: network.wireless[0].rtsCtsThreshold,
    },
    security: {
      id: String(network.security[0].id),
      wirelessSecurityType: String(network.security[0].wirelessSecurityType),
      radius: network.security[0].radius,
      eap: network.security[0].eap,
      macACLType: String(network.security[0].macAclType),
      macACL: network.security[0].macAcls.length
        ? {
            ...network.security[0].macAcls[0],
            id: String(network.security[0].macAcls[0].id),
            macs: network.security[0].macAcls[0].macs.map((el) => ({
              mac: el,
            })),
          }
        : undefined,
    },
  };
};
