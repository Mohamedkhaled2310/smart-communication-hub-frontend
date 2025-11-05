import { memo } from "react";
import { Message } from "../types/message";
import { formatDate } from "../utils/formatDate";

const MessageItem = ({ message, isMine }: { message: Message; isMine: boolean }) => {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] break-words shadow-sm ${
          isMine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
        }`}
      >
        {message.text}
        <p className={`text-[10px] mt-1 ${isMine ? "text-blue-100" : "text-gray-400"}`}>
          {formatDate(message.timestamp || new Date())}
        </p>
      </div>
    </div>
  );
};

export default memo(MessageItem);
