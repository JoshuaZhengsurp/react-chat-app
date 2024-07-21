export interface CreateAccountReq {
  username: string;
  email: string;
  password: string;
}

export interface LoginReq {
  email: string;
  password: string;
}
