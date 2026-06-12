"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api, setAccessToken } from "@/lib/api/client";
import type { AuthSession, AuthUser } from "@/lib/api/types";

export type { AuthUser } from "@/lib/api/types";

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  // On mount, try to restore the session via the refresh cookie.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const me = await api.get<AuthUser>("/auth/me");
        if (active) setUser(me);
      } catch {
        /* not signed in */
      } finally {
        if (active) setReady(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const session = await api.post<AuthSession>("/auth/login", {
      email,
      password,
    });
    setAccessToken(session.accessToken);
    setUser(session.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const session = await api.post<AuthSession>("/auth/register", {
      name,
      email,
      password,
    });
    setAccessToken(session.accessToken);
    setUser(session.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
