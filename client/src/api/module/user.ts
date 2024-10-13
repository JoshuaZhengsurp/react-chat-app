import { request } from "@/config/request";
import type { SetAvatarReq } from "../types";

export const setAvatar = (data: SetAvatarReq) => {
  return request.post<{ image: string }>("/api/user/update", { data });
};

export const getUserInfo = () => {
  return request.get<User>("/api/user/info");
};
