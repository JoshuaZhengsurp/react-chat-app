import { request } from "@/config/request";
import { GetChatListItemReq } from "../types";

export const getChatLists = () => {
  return request.get<ChatList[]>("/api/chat");
};

export const getChatListItem = ({ contactId }: GetChatListItemReq) => {
  return request.get<ChatList>(`/api/chat/${contactId}`);
};

export const updateChatRecord = (data: { message: string; contactId: number }) => {
  return request.post<ChatItem>("/api/chat/record", { data });
};
