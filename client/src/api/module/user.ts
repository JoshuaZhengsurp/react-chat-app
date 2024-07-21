import { request } from "@/config/request";
import type { CreateAccountReq, LoginReq, SetAvatarReq } from "../types";

export const createAccount = (data: CreateAccountReq) => {
  return request.post("/api/user/create", { data });
};

export const login = (data: LoginReq) => {
  return request.post("/api/user/create", { data });
};

export const setAvatar = (data: SetAvatarReq) => {
  return request.post<{image: string}>("/api/user/avatar", { data });
};
