import { useCallback, useContext, useMemo } from "react";
import { Loading } from "@/components/Loading";
import { MessageContain } from "./Contain";
import { MessageHeader } from "./Header";
import { MessageInput } from "./Input";
import { Welcome } from "../Welcome";
import style from "./messaging.module.scss";
import { ChatContext } from "..";

export const Messaging = () => {
  const { currentChat, curContactId, sendChatRecord } = useContext(ChatContext);

  const isWelcome = useMemo(
    () => !Object.keys(currentChat || {}).length,
    [currentChat]
  );

  const handleEnter = useCallback(
    async (message: string) => {
      sendChatRecord &&
        (await sendChatRecord(
          message,
          curContactId || -1,
          currentChat?.contactee?.id || -1
        ));
    },
    [curContactId]
  );

  return (
    <div className={style["contain"]}>
      <Loading LoadingFC={Welcome} isLoading={isWelcome}>
        <MessageHeader contacteeInfo={currentChat!.contactee!} />
        {currentChat && (
          <>
            <MessageContain chatRecords={currentChat.chat!} />
          </>
        )}
        <MessageInput handleEnter={handleEnter} />
      </Loading>
    </div>
  );
};
