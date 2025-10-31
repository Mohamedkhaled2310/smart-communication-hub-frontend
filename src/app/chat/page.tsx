"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";
import ChatWindow from "../components/ChatWindow";
import UserList from "../components/UserList";
import InsightPanel from "../components/InsightPanel";
import { User } from "../types/user";

const socket = io("http://localhost:4000");

export default function ChatPage() {
  const { user, isLoading, fetchUser } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<User>();
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-gray-400">Loading...</div>;
  }
 
  if (!user) {
    return <div className="flex items-center justify-center h-screen text-gray-400">Please log in.</div>;
  }


  return (
    <div className="flex h-screen">

      <div className="w-1/4 border-r bg-gray-50">
        <UserList  onSelect={setSelectedUser} selectedUser={selectedUser} />
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow socket={socket} user={user} receiver={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a user to start chatting
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="w-1/4 border-l bg-gray-50">
          <InsightPanel receiver={selectedUser} />
        </div>
      )}
    </div>
  );
}
