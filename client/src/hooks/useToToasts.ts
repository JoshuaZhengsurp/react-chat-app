import { toast, ToastOptions } from "react-toastify";
import { DEFAULT_TOAST_OPTIONS } from "@/config/constant";

export const useTotoasts = (options: ToastOptions = DEFAULT_TOAST_OPTIONS) => {
  return {
    info: (content: string) => toast.info(content, options),
    error: (content: string) => toast.error(content, options),
    success: (content: string) => toast.success(content, options),
    warning: (content: string) => toast.warning(content, options),
  };
};
