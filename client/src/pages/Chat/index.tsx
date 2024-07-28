import React, { createContext, useEffect, useMemo, useState } from "react";
import style from "./chat.module.scss";
import { useNavigate } from "react-router-dom";
import { getChatItem } from "@/api/module/chat";
import { Messaging, Contact } from "./components";
import { CHAT_APP_USER } from "@/config/constant";
import { mockContact } from "@/config/testData";

type ChatContextType = {
  currentChat?: any;
  currentUser?: User;
};

export const ChatContext = createContext<ChatContextType>({});

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentChat, setCurrentChat] = useState<any>(undefined);

  // 防止重新构建rendertree时重复声明变量。
  const chatContextValue = useMemo(
    () => ({
      currentChat,
      currentUser,
    }),
    [currentChat, currentUser]
  );

  /**
   * @todo 路由守卫，鉴权
   */
  useEffect(() => {
    console.log(localStorage.getItem(CHAT_APP_USER));
    if (!localStorage.getItem(CHAT_APP_USER)) {
      console.log("???");
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem(CHAT_APP_USER) || "{}"));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      const initChatItem = async () => {
        if (currentUser.avatar) {
          // const data = await getChatItem({ id: currentUser.id });
          const data = await new Promise<any>((resolve) => {
            setTimeout(() => {
              resolve({
                data: mockContact,
              });
            }, 100);
          });
          setContacts(data.data);
        } else {
          navigate("avatar");
        }
      };
      initChatItem();
    }
  }, [currentUser]);

  const handleChatChange = (chat: any) => {
    setCurrentChat(chat);
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      <div className={style["content"]}>
        <Contact
          contacts={contacts}
          currentUser={currentUser}
          change={handleChatChange}
        />
        <Messaging />
      </div>
    </ChatContext.Provider>
  );
}
