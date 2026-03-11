"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  setToken as saveTokenAction,
  deleteToken as removeTokenAction,
  getToken as fetchTokenAction,
} from "@/actions/auth";

import { AuthResponse, User } from "@/types/auth";

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (data: AuthResponse["data"]) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await fetchTokenAction();
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (data: AuthResponse["data"]) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    await saveTokenAction(data.token);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    await removeTokenAction();
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
