import * as yup from "yup";
import { countries } from "../../../../../constants/countries";

const ipv4AddressSchema = yup
  .string()
  .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message: "Invalid IP address",
    excludeEmptyString: true,
  })
  .test(
    "ipAddress",
    "IP address value should be less or equal to 255",
    (value) => {
      if (value === undefined || value.trim() === "") return true;
      return value.split(".").find((i) => parseInt(i) > 255) === undefined;
    }
  );

const digitsOnlyStringSchema = yup
  .string()
  .matches(/^\d+$/, { message: "Invalid number", excludeEmptyString: true });

const macSchema = yup
  .string()
  .matches(/^[0-9a-f]{2}([\.:-])(?:[0-9a-f]{2}\1){4}[0-9a-f]{2}$/, {
    message: "Invalid MAC address",
    excludeEmptyString: true,
  });

export const addNewAccessPointSchema = yup.object({
  name: yup.string().required("Name required"),
  deviceId: digitsOnlyStringSchema.required("Device ID required"),
  ip: ipv4AddressSchema.required("IP required"),
  network: yup.object({
    name: yup.string().required("Name required"),
    ssid: yup.string(),
    countryCode: yup
      .string()
      .required("Country required")
      .oneOf(countries.map((el) => el.country)),
    wireless: yup
      .object({
        vht: yup.boolean().required("VHT required"),
        acs: yup.boolean().required("ACS required"),
        beaconInterval: yup.number().required("Beacon interval required"),
        rtsCtsThreshold: yup.number().required("RTS/CTS threshold required"),
      })
      .required("Wireless required"),
    security: yup
      .object({
        wirelessSecurityType: digitsOnlyStringSchema.required("Wireless security type required"),
        radius: ipv4AddressSchema.nullable(),
        eap: yup.boolean().required("EAP required"),
        macACLType: digitsOnlyStringSchema.required("MAC ACL type required"),
        macACL: yup
          .object({
            macs: yup
              .array()
              .of(
                yup.object({
                  mac: macSchema.required("MAC address required"),
                })
              )
              .required("MAC ACL required"),
          })
          .default(undefined)
          .nullable(),
      })
      .required("Security required"),
  }),
});
