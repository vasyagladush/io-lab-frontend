import { FC, ReactNode } from "react";
import { ILoadingBlockProps } from "./LoadingBlock.interface";
import { Spinner } from "../ui-kit";

const SpinnerContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
};

export const LoadingBlock: FC<ILoadingBlockProps> = ({ loading, children }) => {
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner size="md" />
      </SpinnerContainer>
    );
  }

  return <>{children}</>;
};
