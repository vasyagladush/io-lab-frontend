import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      bodyClassName="ml-3 text-md font-normal left"
    />
  );
};
