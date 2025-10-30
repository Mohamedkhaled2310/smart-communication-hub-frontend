"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "../types/user";
import { useMessagesScroll } from "../hooks/useMessagesScroll";
import { Message } from "../types/message";

interface ChatWindowProps {
  socket: any;
  user: User;
  receiver: User;
}

interface SendMessagePayload {
  senderId: number;
  receiverId: number;
  text: string;
}

export default function ChatWindow({ socket, user, receiver }: ChatWindowProps) {
  console.log("ChatWindow props:", user);
  const { messages, loadMore, hasMore } = useMessagesScroll(receiver.id);
  const [liveMessages, setLiveMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, liveMessages.length]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (el && el.scrollTop === 0 && hasMore) {
      const oldHeight = el.scrollHeight;
      loadMore();
      setTimeout(() => {
        const newHeight = el.scrollHeight;
        el.scrollTop = newHeight - oldHeight;
      }, 200);
    }
  };

  useEffect(() => {
    const handleMessage = (message: Message) => {
      if (
        (message.senderId === receiver.id && message.receiverId === user.id) ||
        (message.senderId === user.id && message.receiverId === receiver.id)
      ) {
        setLiveMessages((prev) => [...prev, message]);
      }
    };

    socket.on("message", handleMessage);
    return () => socket.off("message", handleMessage);
  }, [socket, receiver, user]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const payload: SendMessagePayload = {
      senderId: user.id,
      receiverId: receiver.id,
      text,
    };

    socket.emit("send_message", payload);
    setText("");
  };

  const allMessages = [...messages, ...liveMessages];

  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {allMessages.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-lg max-w-xs ${
              m.senderId === user.id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex p-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded-lg p-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
