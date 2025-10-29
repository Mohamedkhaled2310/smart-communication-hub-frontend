// src/hooks/useMessagesScroll.ts
"use client";

import useSWRInfinite from "swr/infinite";
import api from "../lib/api";
import { Message } from "../types/message";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export const useMessagesScroll = (receiverId: number) => {
  const getKey = (pageIndex: number, prevPageData: Message[] | null) => {
    if (prevPageData && !prevPageData.length) return null;
    return `/messages/${receiverId}?skip=${pageIndex * 20}&take=20`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<Message[]>(getKey, fetcher);

  const messages = data ? data.flat().reverse() : []; 

  const loadMore = () => setSize(size + 1);

  return {
    messages,
    isLoading,
    error,
    loadMore,
    hasMore: !error && data?.[data.length - 1]?.length === 20,
  };
};
