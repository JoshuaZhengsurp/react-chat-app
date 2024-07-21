import { request } from "@/config/request";

export const getChatItem = (params: unknown) => {
  return request.get("/api/chat", { params });
};
