import { getChatListItem, updateChatRecord } from "@/api/module/chat";
import { mockChatItems, mockContact } from "@/mockData/testData";
import { toToastError } from "@/utils/toast";
import { useCallback, useEffect, useState } from "react";

function mockGetChatListItem({ contactId }: { contactId: number }) {
  return new Promise<{ data: ChatList }>((resolve) => {
    console.log(contactId);
    setTimeout(() => {
      resolve({
        data: {
          contactee: mockContact[2].contactee,
          chat: mockChatItems,
        },
      });
    }, 100);
  });
}

function mockSendChatRecord({
  message,
  contactId,
  contacteeId,
}: {
  message: string;
  contactId: number;
  contacteeId: number;
}) {
  return new Promise<{ data: ChatItem }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          contactId: Math.floor(100000 * Math.random()),
          userId: 1,
          avatar: "/src/assets/avatar2.png",
          userName: "Joshua",
          contacteeId,
          message,
          createTime: Date.now(),
          theme: "#40a920",
        },
      });
    }, 100);
  });
}

export interface ChatListHook {
  curContactId: number | undefined;
  currentChat: ChatList;
  selectChatList: (contactId: number) => void;
  sendChatRecord: (
    message: string,
    contactId: number,
    contacteeId: number
  ) => Promise<void>;
}

/**
 * @todo
 * indexeddb 作本地缓存
 * todo：判断是否命中本地缓存，不命中则更新数据。
 * 如果聊天数据有更新，会有一个类似“etag”的字段判断，不一致则发送请求获取
 */
export const useChatList = (): ChatListHook => {
  const [curContactId, setCurContactId] = useState(-1);
  const [currentChat, setCurrentChat] = useState<ChatList>({});

  const fetchAndSelectChatList = useCallback(async (contactId: number) => {
    try {
      // const res = await getChatListItem({ contactId });
      const res = await mockGetChatListItem({ contactId });
      setCurrentChat(res.data || {});
    } catch {
      toToastError("Network Error! Please try again");
    }
  }, []);

  const sendChatRecord = useCallback(
    async (message: string, contactId: number, contacteeId: number) => {
      // const res = await updateChatRecord({ message, contactId });
      const res = await mockSendChatRecord({ message, contactId, contacteeId });
      setCurrentChat((prevChat) => ({
        chat: prevChat.chat?.concat(res.data!),
        contactee: prevChat.contactee,
      }));
    },
    [curContactId, currentChat]
  );

  /**
   * @todo: 因为会在多处使用钩子，需要优化，避免重新调用副作用
   */
  useEffect(() => {
    if (curContactId !== undefined && curContactId !== -1) {
      fetchAndSelectChatList(curContactId);
    }
  }, [curContactId]);

  return {
    curContactId,
    currentChat,

    selectChatList: setCurContactId,
    sendChatRecord,
  };
};
