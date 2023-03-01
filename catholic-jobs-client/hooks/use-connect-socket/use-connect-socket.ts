import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useConnectSocket = () => {
  console.log("hook: re-render", new Date().toLocaleString());

  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (socket) {
        console.log(socket)
    } else {
      console.log("hook: re-render in useEffect ", new Date().toLocaleString());
      setSocket(() => io("http://localhost:3001/"));
    }
  }, []);

  return { socket, setSocket };
};

export default useConnectSocket;
