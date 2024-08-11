import { create } from "zustand";

interface MessageState {
    currentChat: ChatList;
    curContactId: number;
    setCurContactId: (contactId: number) => void;
    setCurrentChat: (chatList: ChatList) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  currentChat: [],
  curContactId: -1,

  setCurContactId: (contactId: number) => set(()=>({curContactId: contactId})),
  setCurrentChat: (chatList: ChatList) => set(()=>({currentChat: chatList})),
}));
