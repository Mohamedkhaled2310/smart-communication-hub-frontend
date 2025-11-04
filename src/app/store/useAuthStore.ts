"use client";
import { create } from "zustand";
import api from "../lib/api";
import { User } from "../types/user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  fetchUser: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data, isLoading: false });
    } catch { 
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout", {});
    set({ user: null });
  },
}));
