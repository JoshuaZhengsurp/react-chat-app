import { ToastOptions } from "react-toastify";

// https://fkhadra.github.io/react-toastify/api/toast
export const defaultToastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true, 
    closeButton: true,
    hideProgressBar: false,
    closeOnClick: false,
    theme: "dark",
}