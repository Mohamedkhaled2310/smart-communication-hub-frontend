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
      console.log("fetching user");
      const { data } = await api.get("/auth/me");
      set({ user: data, isLoading: false });
      localStorage.setItem("session", "valid");
    } catch { 
      set({ user: null, isLoading: false });
      localStorage.removeItem("session");
    }
  },

  logout: async () => {
   await api.post("/auth/logout", {});
    set({ user: null });
    localStorage.removeItem("session");
  },
}));
