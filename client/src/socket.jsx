import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "./redux/onlineUsers";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  const { VITE_SERVER_PORT } = import.meta.env;

  useEffect(() => {
    const socket = io(VITE_SERVER_PORT);

    socket.on("userCount", (count) => {
      dispatch(setOnlineUsers({ number: count }));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketProvider, useSocket };
