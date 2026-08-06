"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getStoredData, setStoredData } from "@/lib/store";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "premium";
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
}

const DEFAULT_USER: User = {
  id: "user-1",
  name: "Sophia Rose",
  email: "sophia@deardiary.app",
  avatar: "S",
  plan: "premium",
  joinedDate: "August 2026"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const savedUser = getStoredData<User | null>("deardiary_user", DEFAULT_USER);
    setUser(savedUser);
  }, []);

  const login = (email: string): boolean => {
    const loggedUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0].replace(".", " ").replace(/^./, (str) => str.toUpperCase()),
      email: email.trim(),
      avatar: email.charAt(0).toUpperCase(),
      plan: "premium",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    };
    setUser(loggedUser);
    setStoredData("deardiary_user", loggedUser);
    setAuthModalOpen(false);
    return true;
  };

  const signup = (name: string, email: string): boolean => {
    const newRegisteredUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim() || "Sanctuary Member",
      email: email.trim(),
      avatar: (name.trim() || email).charAt(0).toUpperCase(),
      plan: "free",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    };
    setUser(newRegisteredUser);
    setStoredData("deardiary_user", newRegisteredUser);
    setAuthModalOpen(false);
    return true;
  };

  const loginWithGoogle = () => {
    const googleUser: User = {
      id: `user-google-${Date.now()}`,
      name: "DearDiary Member",
      email: "member@gmail.com",
      avatar: "G",
      plan: "premium",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
    };
    setUser(googleUser);
    setStoredData("deardiary_user", googleUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setStoredData("deardiary_user", null);
  };

  const openAuthModal = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
