import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export interface StoredUser {
  id: string;
  nickname: string;
  avatar?: string;
}

/** 跨平台认证存储：Native 用 SecureStore，Web 用 localStorage */
export const authStorage = {
  async setToken(token: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    }
  },

  async getToken(): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  },

  async setUser(user: StoredUser): Promise<void> {
    const json = JSON.stringify(user);
    if (Platform.OS === "web") {
      localStorage.setItem(AUTH_USER_KEY, json);
    } else {
      await SecureStore.setItemAsync(AUTH_USER_KEY, json);
    }
  },

  async getUser(): Promise<StoredUser | null> {
    let raw: string | null;
    if (Platform.OS === "web") {
      raw = localStorage.getItem(AUTH_USER_KEY);
    } else {
      raw = await SecureStore.getItemAsync(AUTH_USER_KEY);
    }
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  },

  async clear(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } else {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    }
  },
};
