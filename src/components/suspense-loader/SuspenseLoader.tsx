import { FC, ReactNode, Suspense } from "react";
import { Spinner } from "../ui-kit";

interface SuspenseLoaderProps {
  children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
}

export const SuspenseLoader: FC<SuspenseLoaderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full">
          <Spinner size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
