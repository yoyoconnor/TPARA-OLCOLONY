"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { User, UserRole, Division } from "./types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const DEMO_USERS: Record<UserRole, User> = {
  member: {
    id: "user-1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "member",
    phone: "(205) 555-0142",
    memberSince: "2025-06-15",
  },
  coach: {
    id: "coach-1",
    name: "Sarah Mitchell",
    email: "sarah@olcolonygolf.com",
    role: "coach",
    division: "academy",
    phone: "(205) 555-0188",
    memberSince: "2023-01-10",
  },
  staff: {
    id: "staff-1",
    name: "James Wilson",
    email: "james@olcolonygolf.com",
    role: "staff",
    division: "pro_shop",
    phone: "(205) 555-0204",
    memberSince: "2024-03-22",
  },
  division_manager: {
    id: "mgr-1",
    name: "Patricia Adams",
    email: "patricia@olcolonygolf.com",
    role: "division_manager",
    division: "academy",
    phone: "(205) 555-0171",
    memberSince: "2022-08-01",
  },
  executive_manager: {
    id: "exec-1",
    name: "Robert Davis",
    email: "robert@olcolonygolf.com",
    role: "executive_manager",
    phone: "(205) 555-0100",
    memberSince: "2020-01-15",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(
    (_email: string, _password: string, role: UserRole = "member") => {
      setUser(DEMO_USERS[role]);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
