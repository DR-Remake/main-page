import { toast } from "react-toastify";

const Toaster = (status, message) => {
  return toast[status](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export { Toaster };
