import useSWRInfinite from "swr/infinite";
import api from "../lib/api";
import { User } from "../types/user";

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useUsersScroll = () => {
  const getKey = (pageIndex: number, prevPageData: User[] | null) => {
    if (prevPageData && !prevPageData.length) return null;
    return `/users?skip=${pageIndex * 20}&take=20`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<User[]>(getKey, fetcher);

  const users = data ? data.flat() : [];

  const loadMore = () => setSize(size + 1);

  return { users, error, isLoading, loadMore, hasMore: !error && data?.[data.length - 1]?.length === 20 };
};
