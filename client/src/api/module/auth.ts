import { request } from "@/config/request";
import type { CreateAccountReq, LoginReq } from "../types";

export const createAccount = (data: CreateAccountReq) => {
  return request.post("/api/auth/register", { data });
};

export const login = (data: LoginReq) => {
  return request.post("/api/auth/login", { data });
};
