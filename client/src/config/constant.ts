import { ToastOptions } from "react-toastify";

// https://fkhadra.github.io/react-toastify/api/toast
export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  position: "top-right",
  autoClose: 2500,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: true,
  closeButton: true,
  hideProgressBar: true,
  closeOnClick: false,
  theme: "dark",
};

export const CHAT_APP_USER = "chat-app-user";
