import { create } from "zustand";
import { authStorage } from "../utils/authStorage";

interface UserInfo {
  id: string;
  nickname: string;
  avatar?: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: UserInfo | null;
  token: string | null;
  login: (user: UserInfo, token: string) => void;
  logout: () => void;
  restoreAuth: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (user, token) => {
    await authStorage.setToken(token);
    await authStorage.setUser(user);
    set({ isLoggedIn: true, user, token });
  },

  logout: async () => {
    set({ isLoggedIn: false, user: null, token: null });
    await authStorage.clear();
  },

  restoreAuth: async () => {
    const [token, user] = await Promise.all([
      authStorage.getToken(),
      authStorage.getUser(),
    ]);
    if (token && user) {
      set({ isLoggedIn: true, user, token });
    }
  },
}));
