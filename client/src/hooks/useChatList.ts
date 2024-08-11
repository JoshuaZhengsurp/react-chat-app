import { getChatListItem, updateChatRecord } from "@/api/module/chat";
import { mockChatList } from "@/mockData/testData";
import { useMessageStore } from "@/store/module/message";
import { useEffect } from "react";

function mockGetChatListItem () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
            data: mockChatList,
            });
        }, 100);
    })    
}

/**
 * @todo
 * indexeddb 作本地缓存
 */
export const useChatList = () => {
  const { curContactId, currentChat, setCurContactId, setCurrentChat } =
    useMessageStore();

  const fetchChatList = async (contactId: number) => {
    const res = await getChatListItem({ contactId });
    setCurrentChat(res.data || {});
  };

  const saveChatRecord = async (message: string, contactId: number) => {
    const res = await updateChatRecord({ message, contactId });
    setCurrentChat({
      chat: currentChat.chat?.concat(res.data!),
      contactee: currentChat.contactee,
    });
  };

  useEffect(() => {
    fetchChatList(curContactId);
  }, [curContactId]);

  return {
    curContactId,
    currentChat,

    fetchChatList,
    setCurContactId,
    saveChatRecord,
  };
};
