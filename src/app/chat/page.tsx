"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { socket } from "../lib/socket";
import { useAuthStore } from "../store/useAuthStore";
import ChatWindow from "../components/ChatWindow";
import UserList from "../components/UserList";
import { User } from "../types/user";
import { MessageSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function ChatPage() {
  const { user, isLoading, fetchUser } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<User>();
  const router = useRouter();
  const handleBack = useCallback(() => {
    setSelectedUser(undefined);
  }, []);

  const memoizedReceiver = useMemo(() => selectedUser, [selectedUser]);
  const handleOpenInsights = useCallback(() => {
    if (!selectedUser) return;
    router.push(
      `/insights?receiverId=${selectedUser.id}&name=${encodeURIComponent(
        selectedUser.name
      )}`
    );
  }, [router, selectedUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading...
      </div>
    );
  }


  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 flex-col gap-4">
        <p>Please log in.</p>
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go To Login
        </Link>
      </div>
    );
  }




  return (
    <div className="flex h-screen bg-linear-to-br from-blue-50 to-white relative overflow-hidden">
  
      <div
        className={`
          absolute md:static inset-0
          w-full md:w-1/4
          bg-white/70 backdrop-blur-xl
          border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          transform transition-transform duration-500 ease-in-out
          z-30
          ${selectedUser ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        `}
      >
        <UserList onSelect={setSelectedUser} selectedUser={selectedUser} />
      </div>
  
      <div
        className={`
          flex-1 flex flex-col bg-white/80 backdrop-blur-xl
          rounded-none md:rounded-2xl md:mx-4 my-2 md:my-4
          shadow-[0_8px_25px_rgba(0,0,0,0.08)]
          transition-transform duration-500 ease-in-out
          relative z-20
          ${selectedUser ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        {memoizedReceiver ? (
          <ChatWindow
            socket={socket}
            user={user}
            receiver={memoizedReceiver}
            onBack={handleBack}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-lg">
            Select a user to start chatting
          </div>
        )}
      </div>
  
      {selectedUser && (
        <button
          onClick={handleOpenInsights}
          className="fixed bottom-24 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <MessageSquareIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
  
  
}
