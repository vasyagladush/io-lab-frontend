import { type MouseEvent, type ReactNode } from "react";
// import { RestProps } from "../../../utils/rt";

export enum ButtonVariant {
  CONTAINED = "contained",
  OUTLINED = "outlined",
  TEXT = "text",
}

export enum TileButtonVariant {
  PRIMARY = "primary",
  DANGER = "danger",
  CANCEL = "text",
}

export enum Direction {
  LEFT = "left",
  RIGHT = "right",
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  children?: ReactNode | ReactNode[];
  leftIcon?: ReactNode | ReactNode[];
  rightIcon?: ReactNode | ReactNode[];
  rest?: any;
  hideIcon?: boolean;
  loadingText?: string;
}
