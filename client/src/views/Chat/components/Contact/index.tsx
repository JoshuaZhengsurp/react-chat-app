import React, { useEffect, useState } from "react";

import { Setting } from "../Setting";

import logo from "@/assets/logov2.png";
import style from "./contacts.module.scss";
import { useUserStore } from "@/store";

interface ContactProps {
  contacts: any[];
  change: (chat: any)=>void;
}

export const Contact: React.FC<ContactProps> = ({ contacts, change }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(-1);

  const userInfo = useUserStore((state)=>state.userInfo);

  useEffect(() => {
    if (userInfo) {
      // console.log(currentUser, currentUser?.username, currentUser?.avatar);
      setCurrentUserName(userInfo.username as string);
      setCurrentUserImage(userInfo.avatar as string);
    }
  }, [userInfo]);

  const changeCurrentChat = (index: number, contact: any) => {
    setCurrentSelected(index);
    change(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className={style["contain"]}>
          <div className={style["brand"]}>
            <img src={logo} alt="logo" />
            <h3>JOSHUA</h3>
          </div>
          <div className={style["contacts"]}>
            {contacts.map((item, index) => {
              return (
                <div
                  className={`${style["contact-item"]} ${
                    index === currentSelected ? style["selected"] : ""
                  }`}
                  key={item?.id || index}
                  onClick={()=>changeCurrentChat(index, item)}
                >
                  <img src={item.avatar} alt="avatar" />
                  <span>{item.username}</span>
                </div>
              );
            })}
          </div>
          <Setting />
        </div>
      )}
    </>
  );
};
