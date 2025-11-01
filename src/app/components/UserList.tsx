"use client";

import { User } from "../types/user";
import { useUsersScroll } from "../hooks/useUsersScroll";
import { useRef, useEffect } from "react";

interface UserListProps {
  selectedUser?: User;
  onSelect: (user: User) => void;
}

export default function UserList({ selectedUser, onSelect }: UserListProps) {
  const { users, loadMore, hasMore, isLoading } = useUsersScroll();
  const lastUserRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    const current = lastUserRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="overflow-y-auto h-full p-4 bg-white/80 backdrop-blur-xl space-y-2">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Chats</h2>

      {users.map((user, i) => {
        const isLast = i === users.length - 1;
        return (
          <div
            key={user.id}
            ref={isLast ? lastUserRef : null}
            onClick={() => onSelect(user)}
            className={`p-3 cursor-pointer rounded-2xl transition-all shadow-sm ${
              selectedUser?.id === user.id
                ? "bg-blue-100 text-blue-700 shadow-md"
                : "bg-white hover:bg-gray-50 text-gray-800"
            }`}
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        );
      })}

      {isLoading && (
        <p className="text-center text-gray-400 text-sm mt-3">Loading...</p>
      )}
    </div>
  );
  
}
