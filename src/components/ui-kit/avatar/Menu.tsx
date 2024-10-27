import React, { FC } from "react";

interface MenuItemProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <div
      className="font-normal text-[14px] leading-[16px] font-ubuntu cursor-pointer p-4 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
