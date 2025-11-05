"use client";

import { memo, useEffect, useRef, useState, useCallback } from "react";
import { User } from "../types/user";
import { Message } from "../types/message";
import { useMessagesScroll } from "../hooks/useMessagesScroll";
import { formatDate } from "../utils/formatDate";
import { ArrowLeft } from "lucide-react";
import MessageInput from "./MessageInput";

interface ChatWindowProps {
  socket: any;
  user: User;
  receiver: User;
  onBack: () => void;
}

function ChatWindow({ socket, user, receiver, onBack }: ChatWindowProps) {
  const { messages, loadMore, hasMore } = useMessagesScroll(receiver.id);
  const [liveMessages, setLiveMessages] = useState<Message[]>([]);
  const [receiverTyping, setReceiverTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const textRef = useRef("");

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el && el.scrollTop === 0 && hasMore) {
      const oldHeight = el.scrollHeight;
      loadMore();
      setTimeout(() => {
        el.scrollTop = el.scrollHeight - oldHeight;
      }, 200);
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    if (!socket || !user?.id) return;

    socket.emit("register", user.id);

    const handleMessage = (msg: Message) => {
      const relevant =
        (msg.senderId === receiver.id && msg.receiverId === user.id) ||
        (msg.senderId === user.id && msg.receiverId === receiver.id);
      if (relevant) setLiveMessages((prev) => [...prev, msg]);
    };

    const handleTyping = (data: { senderId: number; receiverId: number }) => {
      if (data.senderId === receiver.id && data.receiverId === user.id)
        setReceiverTyping(true);
    };

    const handleStopTyping = (data: { senderId: number; receiverId: number }) => {
      if (data.senderId === receiver.id && data.receiverId === user.id)
        setReceiverTyping(false);
    };

    socket.on("message", handleMessage);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);

    return () => {
      socket.off("message", handleMessage);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
    };
  }, [socket, user?.id, receiver.id]);

  // --- scroll to bottom on new messages ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, liveMessages.length]);

  const handleTextChange = useCallback(
    (val: string) => {
      textRef.current = val;

      if (!socket) return;
      if (!val.trim()) {
        socket.emit("stop_typing", { senderId: user.id, receiverId: receiver.id });
        return;
      }

      socket.emit("typing", { senderId: user.id, receiverId: receiver.id });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = window.setTimeout(() => {
        socket.emit("stop_typing", { senderId: user.id, receiverId: receiver.id });
      }, 1500);
    },
    [socket, user.id, receiver.id]
  );

  const sendMessage = useCallback(() => {
    const message = textRef.current.trim();
    if (!message) return;

    socket.emit("send_message", {
      senderId: user.id,
      receiverId: receiver.id,
      text: message,
    });
    socket.emit("stop_typing", { senderId: user.id, receiverId: receiver.id });
    textRef.current = "";
  }, [socket, user.id, receiver.id]);

  // merge messages
  const allMessages = (() => {
    const map = new Map<string, Message>();
    [...messages, ...liveMessages].forEach((m, i) => {
      const key = (m as any).id ?? `${m.senderId}-${m.receiverId}-${i}`;
      map.set(key, m);
    });
    return Array.from(map.values());
  })();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-md overflow-hidden">
      <div className="flex items-center px-4 py-3 border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="md:hidden text-gray-500 hover:text-gray-700 transition">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="ml-2">
          <h2 className="text-lg font-semibold text-gray-800">{receiver.name}</h2>
          <p className="text-xs text-gray-500">{receiver.email}</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
      >
        {allMessages.map((m, i) => {
          const isMine = m.senderId === user.id;
          const key = (m as any).id ?? `${m.senderId}-${i}`;
          return (
            <div key={key} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] break-words shadow-sm ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                }`}
              >
                {m.text}
                <p className={`text-[10px] mt-1 ${isMine ? "text-blue-100" : "text-gray-400"}`}>
                  {formatDate(m.timestamp || new Date())}
                </p>
              </div>
            </div>
          );
        })}

        {receiverTyping && (
          <div className="px-3 text-sm text-gray-500 italic animate-pulse">
            {receiver.name.split(" ")[0]} is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <MessageInput text="" setText={handleTextChange} onSend={sendMessage} />
    </div>
  );
}

export default memo(ChatWindow, (prev, next) =>
  prev.user.id === next.user.id && prev.receiver.id === next.receiver.id
);
