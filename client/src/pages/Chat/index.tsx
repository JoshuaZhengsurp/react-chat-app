import React, { useEffect, useState } from "react";
import style from "./chat.module.scss";
import { useNavigate } from "react-router-dom";
import { getChatItem } from "@/api/module/chat";
import { Contact } from "./components/Contact";
import { CHAT_APP_USER } from "@/config/constant";
import { mockContact } from "@/config/testData";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [currentChat, setCurrentChat] = useState<any>(undefined);

  /**
   * @todo 路由守卫，鉴权
   */
  useEffect(() => {
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
        if (currentUser.isAvatarImageSet) {
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
  }

  return (
    <>
      <div className={style["content"]}>
        <Contact 
          contacts={contacts} 
          currentUser={currentUser} 
          change={handleChatChange} />
      </div>
    </>
  );
}
