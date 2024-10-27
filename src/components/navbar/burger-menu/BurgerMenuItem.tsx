import { FC, MouseEvent, ReactNode } from "react";
import { Typography, TypographyVariant } from "../../ui-kit";
import { Dot } from "../../icons";

interface BurgerMenuItemProps {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: JSX.Element;
  label: string;
  children?: ReactNode | ReactNode[];
  level?: 1 | 2;
  lastItem?: boolean;
  isActive?: boolean;
}

export const BurgerMenuItem: FC<BurgerMenuItemProps> = ({
  onClick,
  icon,
  label,
  children,
  level = 1,
  lastItem,
  isActive,
}) => {
  const hasChildren = !!children;

  return (
    <div
      className={`flex flex-col cursor-pointer py-1 ${
        level === 2 ? "pl-6" : ""
      } ${!hasChildren && !lastItem ? "border-b border-gray-300" : ""}`}
      onClick={onClick}
    >
      <div
        className={`flex items-center ${hasChildren ? "py-1" : ""} ${
          isActive ? "text-green-600" : ""
        }`}
      >
        <div className="flex justify-center items-center w-6 h-6 text-gray-400">
          {icon ?? <Dot />}
        </div>
        <Typography
          variant={TypographyVariant.HEADER4}
          color={isActive ? "#6CB155" : undefined}
        >
          {label}
        </Typography>
      </div>
      {children}
    </div>
  );
};
