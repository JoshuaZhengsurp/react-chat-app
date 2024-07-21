import React, { useEffect, useState } from "react";
import style from "./chat.module.scss";
import { useNavigate } from "react-router-dom";
import { getChatItem } from "@/api/module/chat";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState<any>(undefined);

  /**
   * @todo 路由守卫，鉴权
   */
  useEffect(() => {
    if (!localStorage.getItem("chat-app.user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user") || "{}"));
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      const initChatItem = async () => {
        if (currentUser.isAvatarImageSet) {
          const data = await getChatItem({ id: currentUser.id });
          setContacts(data.data);
        } else {
          navigate("avatar");
        }
      };
      initChatItem();
    }
  }, [currentUser]);

  return (
    <>
      <div className={style["content"]}>chat</div>
    </>
  );
}
