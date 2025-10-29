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
    <div className="overflow-y-auto h-full border-r p-2 bg-white">
      {users.map((user, i) => {
        const isLast = i === users.length - 1;
        return (
          <div
            key={user.id}
            ref={isLast ? lastUserRef : null}
            onClick={() => onSelect(user)}
            className={`p-3 border-b cursor-pointer rounded-lg hover:bg-gray-100 ${
              selectedUser?.id === user.id ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        );
      })}

      {isLoading && (
        <p className="text-center text-gray-500 p-2">Loading...</p>
      )}
    </div>
  );
}
