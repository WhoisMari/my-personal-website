import React, { createContext, useContext, useState, useCallback } from "react";
import config from "../config.json";

interface AuthUser {
  access: string;
  refresh: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  refreshAccess: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "admin_tokens";

function loadTokens(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadTokens);

  const login = useCallback(async (username: string, password: string): Promise<string | null> => {
    try {
      const res = await fetch(`${config.server_url}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return "Invalid credentials";
      const tokens: AuthUser = await res.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
      setUser(tokens);
      return null;
    } catch {
      return "Network error";
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const refreshAccess = useCallback(async (): Promise<string | null> => {
    const tokens = loadTokens();
    if (!tokens) return null;
    try {
      const res = await fetch(`${config.server_url}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
      if (!res.ok) {
        logout();
        return null;
      }
      const { access } = await res.json();
      const updated = { ...tokens, access };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setUser(updated);
      return access;
    } catch {
      return null;
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
