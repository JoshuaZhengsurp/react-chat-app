import { request } from "@/config/request";
import type { CreateAccountReq, LoginReq } from "../types";

export const createAccount = (data: CreateAccountReq) => {
  return request.post("/api/user/create", { data });
};

export const login = (data: LoginReq) => {
  return request.post("/api/user/create", { data });
};

export const setAvatar = (data: any) => {
  return request.post("/api/user/avatar", { data });
};
