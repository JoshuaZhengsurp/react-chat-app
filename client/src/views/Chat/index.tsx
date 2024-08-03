import React, { createContext, useEffect, useMemo, useState } from "react";
import style from "./chat.module.scss";
import { getChatItem } from "@/api/module/chat";
import { Messaging, Contact } from "./components";
import { CHAT_APP_USER } from "@/config/constant";
import { mockContact } from "@/config/testData";
import { useUserStore } from "@/store";

type ChatContextType = {
  currentChat?: ChatList;
};

export const ChatContext = createContext<ChatContextType>({});

export default function Chat() {
  const userInfo = useUserStore((state) => state.userInfo);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatList>({});

  // 防止重新构建rendertree时重复声明变量。
  const chatContextValue = useMemo(
    () => ({
      currentChat,
    }),
    [currentChat]
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

  // todo：判断是否命中本地缓存，不命中则更新数据。
  //  如果聊天数据有更新，会有一个类似“etag”的字段判断，不一致则发送请求获取
  //  期望：使用浏览器的IndexDB存储
  const getChatItem = async (chatId: string) => {};

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
    getChatItem(chat.id);
  };

  useEffect(() => {
    if (userInfo) {
      getContactList();
    }
  }, [userInfo]);

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className={style["content"]}>
        <Contact contacts={contacts} change={handleChatChange} />
        <Messaging />
      </div>
    </ChatContext.Provider>
  );
}
