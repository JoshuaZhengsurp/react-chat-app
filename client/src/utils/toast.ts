import { useTotoasts } from "@/hooks/useToToasts";

type ToastType = "info" | "success" | "error" | "warning";

const toast = useTotoasts();

export const toToast = (type: ToastType, content: string) => toast[type](content);
export const toToastError = (content: string) => toast.error(content);
export const toToastInfo = (content: string) => toast.info(content);
export const toToastSuccess = (content: string) => toast.success(content);
export const toToastWarning = (content: string) => toast.warning(content);
