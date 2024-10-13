import { createContext, useEffect, useMemo, useState } from "react";

import { Messaging } from "./Messaging";
import { Contact } from "./Contact";

import style from "./chat.module.scss";
import { getChatListItem } from "@/api/module/chat";
import { CHAT_APP_USER } from "@/config/constant";
import { mockChatItems, mockContact } from "@/mockData/testData";
import { useUserStore } from "@/store";
import { ChatListHook, useChatList } from "@/hooks/useChatList";

interface ChatContextType extends Partial<ChatListHook> {};

export const ChatContext = createContext<ChatContextType>({});

export default function Chat() {
  const userInfo = useUserStore((state) => state.userInfo);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const {
    curContactId, 
    currentChat,
    selectChatList, 
    sendChatRecord,
  } = useChatList();

  // 防止重新构建rendertree时重复声明变量。
  const chatContextValue = useMemo(
    () => ({
      curContactId, 
      currentChat,
      selectChatList, 
      sendChatRecord,
    }),
    [curContactId, currentChat]
  );

  const getContactList = async () => {
    const data = await new Promise<{data: Contact[]}>((resolve) => {
      setTimeout(() => {
        resolve({
          data: mockContact,
        });
      }, 100);
    });
    setContacts(data.data);
  };

  useEffect(() => {
    if (userInfo) {
      getContactList();
    }
  }, [userInfo]);

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className={style["content"]}>
        <Contact contacts={contacts} />
        <Messaging />
      </div>
    </ChatContext.Provider>
  );
}
