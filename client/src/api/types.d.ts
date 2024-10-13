export interface CreateAccountReq {
  username: string;
  email: string;
  password: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface SetAvatarReq {
  img: string;
  [propName in string]: unknown;
}

export interface GetChatListItemReq {
  contactId: number;
}
