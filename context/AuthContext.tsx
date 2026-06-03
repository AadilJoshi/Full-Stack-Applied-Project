"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  username: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    // fake authentication (assignment-friendly)
    if (username === "admin" && password === "admin") {
      setUser({ username: "admin", role: "admin" });
      return true;
    }

    if (username === "user" && password === "user") {
      setUser({ username: "user", role: "user" });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}