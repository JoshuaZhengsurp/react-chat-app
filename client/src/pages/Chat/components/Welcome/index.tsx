import React, { useContext } from "react";
import style from "./welcome.module.scss";
import welcomeImg from "@/assets/robot.gif";
import { ChatContext } from "@/pages/Chat";

export const Welcome: React.FC = () => {
  const { currentUser } = useContext(ChatContext);
  
  return (
    <div className={style["contain"]}>
      <img src={welcomeImg} alt="welcome" />
      <h1>
        Welcome, <span>{currentUser?.username || ''}</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  );
};
