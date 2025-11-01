import React, { memo, useRef } from "react";

interface MessageInputProps {
  text: string;
  setText: (v: string) => void;
  onSend: () => void;
}

const MessageInput = ({ setText, onSend }: MessageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => setText(inputRef.current?.value ?? "");

  const handleSend = () => {
    onSend();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex p-2 border-t bg-white">
      <input
        ref={inputRef}
        onInput={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 border rounded-lg p-2 outline-none"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default memo(MessageInput);
