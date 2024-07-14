import { socket } from "@/plugins/Socket.io";
import { useState, useEffect } from "react";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onFooEvent(value: string) {
      setFooEvents((prev) => [...prev, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
  });

  return {
    isConnected,
    fooEvents,
  };
};
