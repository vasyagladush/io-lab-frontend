import { FC } from "react";
import { Spinner as FlowbiteSpinner } from "flowbite-react";

export const Spinner: FC<{
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}> = ({ size = "md", className }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <FlowbiteSpinner size={size} />
    </div>
  );
};
