import { FC } from "react";
import { IButtonProps, ButtonVariant } from "./Button.interface";
import { Spinner } from "..";
import { Button as FlowbiteButton } from "flowbite-react";

// Tailwind CSS styles for different variants
const variantStyles = {
  [ButtonVariant.CONTAINED]:
    "bg-[#556CB1] text-white border-none hover:bg-[#19385e] hover:shadow-md disabled:bg-[#adb5bd] disabled:cursor-default disabled:pointer-events-none",
  [ButtonVariant.OUTLINED]:
    "bg-white border border-[#dbe3eb] text-[#556CB1] hover:border-[#8181a5] disabled:bg-[#adb5bd] disabled:border-none disabled:text-white disabled:cursor-default disabled:pointer-events-none",
  [ButtonVariant.TEXT]:
    "bg-transparent text-[#556CB1] border-none font-normal hover:shadow-inner disabled:bg-[#adb5bd] disabled:text-[#adb5bd] disabled:cursor-default disabled:pointer-events-none",
};

export const Button: FC<IButtonProps> = ({
  children,
  variant = ButtonVariant.CONTAINED,
  fullWidth,
  leftIcon,
  rightIcon,
  disabled,
  loading,
  onClick,
  loadingText,
  ...rest
}) => {
  const buttonClasses = `
    ${variantStyles[variant] || variantStyles[ButtonVariant.CONTAINED]}
    ${fullWidth ? "w-full" : "w-auto"}
    flex items-center justify-center text-center rounded-[5px] px-5 py-2 transition duration-200 h-9
    cursor-pointer
  `;

  if (loading) {
    return (
      <FlowbiteButton disabled className={buttonClasses} {...rest}>
        <Spinner />
        <span className="inline ml-2">{loadingText ?? "Processing"}</span>
      </FlowbiteButton>
    );
  }

  return (
    <FlowbiteButton
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {leftIcon && <span className="flex items-center mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center ml-2">{rightIcon}</span>}
    </FlowbiteButton>
  );
};
