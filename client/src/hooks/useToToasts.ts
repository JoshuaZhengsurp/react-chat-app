import { toast, ToastOptions } from "react-toastify";
import { defaultToastOptions } from "@/config/constant";

export const useTotoasts = (options: ToastOptions = defaultToastOptions) => {
  return {
    info: (content: string) => toast.info(content, options),
    error: (content: string) => toast.error(content, options),
    success: (content: string) => toast.success(content, options),
    warning: (content: string) => toast.warning(content, options),
  };
};
