import io  from "socket.io-client";

export const socket = io("https://smart-communication-hub-backend-production.up.railway.app", {
  autoConnect: true,
  transports: ["websocket"],
});