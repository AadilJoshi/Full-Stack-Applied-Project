"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id: number;
  username: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // LOAD FROM LOCALSTORAGE (FOR DEMO)
  // ----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ----------------------------
  // FAKE LOGIN (NO API)
  // ----------------------------
  const login = async (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      const adminUser = {
        id: 1,
        username: "admin",
        role: "admin",
      };

      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));

      return true;
    }

    if (username === "user" && password === "user") {
      const normalUser = {
        id: 2,
        username: "user",
        role: "user",
      };

      setUser(normalUser);
      localStorage.setItem("user", JSON.stringify(normalUser));

      return true;
    }

    return false;
  };

  // ----------------------------
  // LOGOUT
  // ----------------------------
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

// ----------------------------
// HOOK
// ----------------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}