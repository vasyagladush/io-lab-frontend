import {
  HiCheck,
  HiExclamation,
  HiX,
  HiInformationCircle,
} from "react-icons/hi";

export const toastifyIcons = () => {
  const InfoIcon = (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
      <HiInformationCircle className="h-5 w-5" />
    </div>
  );

  const SuccessIcon = (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
      <HiCheck className="h-5 w-5" />
    </div>
  );

  const WarningIcon = (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
      <HiExclamation className="h-5 w-5" />
    </div>
  );

  const ErrorIcon = (
    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
      <HiX className="h-5 w-5" />
    </div>
  );

  return { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon };
};
