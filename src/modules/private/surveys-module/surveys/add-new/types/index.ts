export interface NetworkFormValues {
  id: string;
  name: string;
  ssid?: string;
  countryCode: string;
  wireless: {
    id: string;
    vht: boolean;
    acs: boolean;
    beaconInterval: number;
    rtsCtsThreshold: number;
  };
  security: {
    id: string;
    wirelessSecurityType: string; // TYPE-TODO: add enum from backend types
    radius: string | null;
    eap: boolean;
    macACLType: string; // TYPE-TODO: add enum from backend types
    macACL?: { id: string; name: string; macs: Array<{ mac: string }> };
  };
}

export interface AccessPointFormValues {
  name: string;
  deviceId: number;
  ip: string;
  network: NetworkFormValues;
}
