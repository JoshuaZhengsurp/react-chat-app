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

// 日韩输入时enter确认也是229
export const KEY_CODE_CHINESE_INPUT = 229;
export const KEY_CODE_ENTER = 13;
