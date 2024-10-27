import { Control, useFieldArray, useWatch } from "react-hook-form";
import { AccessPointFormValues, NetworkFormValues } from "../types";
import {
  CheckboxFormField,
  DropdownFormField,
  TextFormInput,
} from "../../../../../../components/form-fields";
import styled from "styled-components";
import {
  Typography,
  TypographyVariant,
} from "../../../../../../components/ui-kit";
import { ViewRow } from "./ViewRow";

// # WirelessSecurityType:
// # NO_PROTECTION = 0
// # WEP = 1
// # WPA_PSK = 2
// # WPA_ENTERPRISE = 3
// # WPA2_PSK = 4
// # WPA2_ENTERPRISE = 5
// # WPA3_PSK = 6
// # WPA3_ENTERPRISE = 7

// # ACLType:
// # OFF = 0
// # DENY = 1
// # PERMIT = 2

const WIRELESS_SECURITY_TYPE_DROPDOWN_MAP = [
  { label: "NO_PROTECTION", value: "0" },
  { label: "WEP", value: "1" },
  { label: "WPA_PSK", value: "2" },
  { label: "WPA_ENTERPRISE", value: "3" },
  { label: "WPA2_PSK", value: "4" },
  { label: "WPA2_ENTERPRISE", value: "5" },
  { label: "WPA3_PSK", value: "6" },
  { label: "WPA3_ENTERPRISE", value: "7" },
];
const MAC_ACL_TYPE_DROPDOWN_MAP = [
  { label: "OFF", value: "0" },
  { label: "DENY", value: "1" },
  { label: "PERMIT", value: "2" },
];

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 30px;
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-top: 10px;
`;

const Label = styled(Typography)`
  margin-bottom: 20px;
`;

const AddRemoveWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3px;
`;

const MacsWrapper = styled.div`
  margin-top: 20px;
`;

const MacsTextInputField = styled(TextFormInput)<{
  widthPaddingTop?: boolean;
}>`
  padding-top: ${(props) => (props.widthPaddingTop ? "27px" : 0)};
`;

const StyledCheckBoxFormField = styled(CheckboxFormField)`
  margin-top: 20px;
`;

interface NetworkSecurityConfigProps {
  control: Control<AccessPointFormValues>;
  macACL: NetworkFormValues["security"]["macACL"];
}

const NetworkSecurityConfig: React.FunctionComponent<
  NetworkSecurityConfigProps
> = ({ control, macACL }) => {
  const wirelessSecurityTypeValue = useWatch({
    control,
    name: "network.security.wirelessSecurityType",
  });

  const macACLTypeValue = useWatch({
    control,
    name: "network.security.macACLType",
  });

  const { append: appendMAC, remove: removeMAC } = useFieldArray({
    control,
    name: "network.security.macACL.macs",
  });

  return (
    <Container>
      <Label color="#556CB1" variant={TypographyVariant.HEADER2}>
        Network security configuration
      </Label>
      <ViewRow>
        <DropdownFormField
          label="Wireless Security Type"
          placeholder="Wireless Security Type"
          name="network.security.wirelessSecurityType"
          control={control}
          items={WIRELESS_SECURITY_TYPE_DROPDOWN_MAP}
          value={wirelessSecurityTypeValue}
          required
        />
        <DropdownFormField
          label="MAC ACL Type"
          placeholder="MAC ACL Type"
          name="network.security.macACLType"
          control={control}
          items={MAC_ACL_TYPE_DROPDOWN_MAP}
          value={macACLTypeValue}
          required
        />
      </ViewRow>
      <ViewRow>
        <TextFormInput
          name={"network.security.radius"}
          control={control}
          label="Radius"
          placeholder="Radius"
        />
      </ViewRow>{" "}
      <StyledCheckBoxFormField
        label="EAP on/off"
        name="network.security.eap"
        control={control}
        required
      />
      {macACL &&
        macACL.macs?.map((item, index) => {
          return (
            <MacsWrapper key={index}>
              <MacsTextInputField
                name={`network.security.macACL.macs.${index}.mac`}
                label={index === 0 ? "MAC ACL addresses" : undefined}
                control={control}
                placeholder="00:00:00:00:00:00"
                widthPaddingTop={false}
              />
              {index !== 0 && (
                <AddRemoveWrapper>
                  <Typography
                    variant={TypographyVariant.BODY4}
                    color="#24A5EE"
                    onClick={() => {
                      removeMAC(index);
                    }}
                    clickable
                  >
                    - Remove MAC
                  </Typography>
                </AddRemoveWrapper>
              )}
              {index === 0 && (
                <AddRemoveWrapper>
                  <Typography
                    variant={TypographyVariant.BODY4}
                    color="#24A5EE"
                    onClick={() => {
                      appendMAC({ mac: "" });
                    }}
                    clickable
                  >
                    + Add MAC
                  </Typography>
                </AddRemoveWrapper>
              )}
            </MacsWrapper>
          );
        })}
    </Container>
  );
};

export default NetworkSecurityConfig;
