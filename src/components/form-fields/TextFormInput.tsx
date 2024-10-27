import React from "react";
import { Controller } from "react-hook-form";
import { TextFormFieldProps } from "./TextFormInput.interface";
import { TextInput, TextInputErrorVariant } from "../ui-kit";

export const TextFormInput: React.FunctionComponent<TextFormFieldProps> = ({
  label,
  name,
  control,
  rightIcon,
  leftIcon,
  disabled,
  required,
  className,
  onBlur,
  successBorder,
  disableErrorMessage,
  width,
  ...inputProps
}) => (
  <div className={`flex flex-col w-full pt-2 ${className}`}>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => {
        const variant = () => {
          if (successBorder) {
            if (error != null) {
              return TextInputErrorVariant.ERROR;
            } else {
              return TextInputErrorVariant.SUCCESS;
            }
          } else {
            if (error != null) {
              return TextInputErrorVariant.ERROR;
            } else {
              return TextInputErrorVariant.DEFAULT;
            }
          }
        };

        return (
          <TextInput
            width={width}
            disabled={disabled}
            variant={variant()}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            {...inputProps}
            onChange={onChange}
            value={value}
            name={name}
            onBlur={onBlur}
            label={label}
            error={error?.message}
            disableErrorMessage={disableErrorMessage}
            required={required}
          />
        );
      }}
    />
  </div>
);
