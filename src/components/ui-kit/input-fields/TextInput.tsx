import React from "react";
import { Typography } from "../typography/Typography";
import { TypographyVariant } from "../typography/Typography.interface";
import { ITextInputProps, TextInputErrorVariant } from "./TextInput.interface";

export const TextInput: React.FunctionComponent<ITextInputProps> = ({
  rightIcon,
  leftIcon,
  disabled,
  variant,
  label,
  error,
  disableErrorMessage,
  required,
  ref,
  className,
  ...rest
}) => {
  const borderColor = () => {
    switch (variant) {
      case TextInputErrorVariant.ERROR:
        return "border-red-500";
      case TextInputErrorVariant.SUCCESS:
        return "border-green-500";
      case TextInputErrorVariant.ACTIVE:
        return "border-blue-500 ring-blue-300";
      default:
        return "border-gray-300";
    }
  };

  const backgroundColor = disabled ? "bg-gray-200" : "bg-white";

  return (
    <div className={`flex flex-col w-full ${className} ${disabled ? "pointer-events-none" : ""}`}>
      {label && (
        <label className="flex items-center mb-1">
          <Typography variant={TypographyVariant.HEADER3}>
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </Typography>
        </label>
      )}
      <div
        className={`flex justify-between items-center border rounded-lg h-9 px-3 ${backgroundColor} ${borderColor()} focus-within:${borderColor()}`}
      >
        {leftIcon && <span className="flex items-center">{leftIcon()}</span>}
        <input
          className={`w-full h-full border-none outline-none text-sm text-gray-800 ${disabled ? "bg-gray-200" : "bg-white"} placeholder-gray-400`}
          disabled={disabled}
          {...rest}
          ref={ref}
          placeholder=" "
        />
        {rightIcon && <span className="flex items-center">{rightIcon()}</span>}
      </div>
      {error && !disableErrorMessage && (
        <div className="text-red-500 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};
