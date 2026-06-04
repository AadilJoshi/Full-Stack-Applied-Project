"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  username: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      setUser(JSON.parse(stored));
    }

    setLoading(false);
  }, []);

  const login = (username: string, password: string) => {
    let newUser: User | null = null;

    if (username === "admin" && password === "admin") {
      newUser = { username: "admin", role: "admin" };
    }

    if (username === "user" && password === "user") {
      newUser = { username: "user", role: "user" };
    }

    if (newUser) {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}