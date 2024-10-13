import React from "react";
import style from "./welcome.module.scss";
import welcomeImg from "@/assets/robot.gif";
import { useUserStore } from "@/store";

export const Welcome: React.FC = () => {
  const userInfo = useUserStore((state)=>state.userInfo);
  
  return (
    <div className={style["contain"]}>
      <img src={welcomeImg} alt="welcome" />
      <h1>
        Welcome, <span>{userInfo?.username || ''}</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  );
};
