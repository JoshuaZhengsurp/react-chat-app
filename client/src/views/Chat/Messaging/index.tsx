import React, { useContext, useMemo } from "react";
import { Loading } from "@/components/Loading";
import {
  MessageContain,
  MessageInput,
  MessageHeader,
} from "@/components/Message";
import { Welcome } from "../Welcome";
import { ChatContext } from "@/views/Chat";
import style from "./messaging.module.scss";

export const Messaging = () => {
  const { currentChat } = useContext(ChatContext);
  const isWelcome = useMemo(
    () => !Object.keys(currentChat || {}).length,
    [currentChat]
  );

  return (
    <div className={style["contain"]}>
      <Loading LoadingFC={Welcome} isLoading={isWelcome}>
        <MessageHeader contacteeInfo={currentChat!.contactee!} />
        {currentChat && (
          <>
            <MessageContain chatRecords={currentChat.chat!}/>
          </>
        )}
        <MessageInput />
      </Loading>
    </div>
  );
};
