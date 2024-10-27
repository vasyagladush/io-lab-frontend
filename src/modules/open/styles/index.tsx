import { Link } from "react-router-dom";
import {
  Button,
  IButtonProps,
  Typography,
  TypographyVariant,
} from "../../../components/ui-kit";
import { FC } from "react";

export const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="p-[5rem] mx-auto h-[calc(100vh-10rem)] overflow-auto max-w-[470px]">
      {children}
    </section>
  );
};

export const Body1: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="text-center mt-6">
      <Typography>{children}</Typography>
    </div>
  );
};

export const ForgotPasswordButton: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="text-[#8181a5] text-right mt-1 cursor-pointer">
      <Typography>{children}</Typography>
    </div>
  );
};

export const StyledLink: FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <Link to={to} className="text-[#027aff] no-underline">
      {children}
    </Link>
  );
};

export const StyledButton: FC<IButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button className="mt-8" {...rest}>
      {children}
    </Button>
  );
};

export const ErrorMessage: FC<{
  variant: TypographyVariant;
  children: React.ReactNode;
  color: string;
}> = ({ children, variant, color }) => {
  return (
    <div className="text-center">
      <Typography variant={variant} color={color}>
        {children}
      </Typography>
    </div>
  );
};

export const Title: FC<{
  variant: TypographyVariant;
  children: React.ReactNode;
}> = ({ children, variant }) => {
  return (
    <div className="text-center mb-4">
      <Typography variant={variant}>{children}</Typography>
    </div>
  );
};
