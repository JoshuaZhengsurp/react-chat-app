import { ToastOptions } from "react-toastify";

// https://fkhadra.github.io/react-toastify/api/toast
export const defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2500,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true, 
    closeButton: true,
    hideProgressBar: true,
    closeOnClick: false,
    theme: "dark",
}