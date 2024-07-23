import React, { useEffect, useState } from "react";
import logo from "@/assets/logov2.png";
import style from "./contacts.module.scss";

interface ContactProps {
  contacts: any[];
  currentUser: any;
}

export const Contact: React.FC<ContactProps> = ({ contacts, currentUser }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(-1);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser, currentUser?.username, currentUser?.avatar);
      setCurrentUserName(currentUser.username as string);
      setCurrentUserImage(currentUser.avatar as string);
    }
  }, [currentUser]);

  const changeCurrentChat = (index: number, contact: any) => {};

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
                  className={`contact-item ${
                    index === currentSelected ? style["selected"] : ""
                  }`}
                  key={item?.id || index}
                >
                  <div className={style["contact-avatar"]}>
                    <img src={item.avatar} alt="avatar" />
                  </div>
                  <div className={style["contact-username"]}>
                    <span>{item.username}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style["user-info"]}>
            <div className={style["user-avatar"]}>
              <img src={currentUser.avatar} alt="avatar" />
            </div>
            <div className={style["user-username"]}>
              <span>{currentUser.username}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
