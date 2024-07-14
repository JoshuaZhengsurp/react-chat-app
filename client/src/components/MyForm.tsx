import { socket } from "@/plugins/Socket.io";
import { FormEvent, useState } from "react";

export default function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(5000).emit("create-something", value, () => {
      console.log('???', value);
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} placeholder="place input"/>
      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}
