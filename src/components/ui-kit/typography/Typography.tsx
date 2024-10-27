import React, { FC } from "react";
import { TypographyVariant } from "./Typography.interface";

interface TypographyProps {
  variant?: TypographyVariant;
  clickable?: boolean;
  hoverUnderline?: boolean;
  color?: string;
  children: React.ReactNode;
}

const getVariantClasses = (variant?: TypographyVariant): string => {
  switch (variant) {
    case TypographyVariant.HEADER1:
      return "font-semibold text-[22px] leading-[22px]";
    case TypographyVariant.HEADER2:
      return "font-semibold text-[15px] leading-[22px]";
    case TypographyVariant.HEADER3:
      return "font-semibold text-[12px] leading-[22px]";
    case TypographyVariant.HEADER4:
      return "font-medium text-[15px] leading-[22px]";
    case TypographyVariant.HEADLINE:
      return "font-normal text-[14px] leading-[22px]";
    case TypographyVariant.BODY1:
      return "font-medium text-[14px] leading-[17px]";
    case TypographyVariant.BODY2:
      return "font-normal text-[14px] leading-[20px]";
    case TypographyVariant.BODY3:
      return "font-normal text-[13px] leading-[16px]";
    case TypographyVariant.BODY4:
      return "font-medium text-[13px] leading-[22px]";
    case TypographyVariant.BODY5:
      return "font-semibold text-[13px] leading-[16px]";
    case TypographyVariant.BODY6:
      return "font-medium text-[12px] leading-[22px]";
    case TypographyVariant.BODY7:
      return "font-normal text-[12px] leading-[22px]";
    case TypographyVariant.CAPTION:
      return "font-normal text-[10px] leading-[22px]";
    case TypographyVariant.BODY13:
      return "font-medium text-[13px] leading-[22px] text-right";
    case TypographyVariant.BODY13_REGULAR:
      return "font-normal text-[13px] leading-[20px]";
    default:
      return "";
  }
};

export const Typography: FC<TypographyProps> = ({
  variant,
  clickable = false,
  hoverUnderline = false,
  color = "#556CB1",
  children,
}) => {
  // Combine Tailwind classes based on props
  const classes = `${getVariantClasses(variant)} ${
    clickable ? "cursor-pointer" : ""
  } ${hoverUnderline ? "hover:underline" : ""}`;

  return (
    <p className={classes} style={{ color }}>
      {children}
    </p>
  );
};
