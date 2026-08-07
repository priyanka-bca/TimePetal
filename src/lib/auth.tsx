"use client";

import React, { createContext, useContext, useState } from "react";
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "premium";
  joinedDate: string;
  emailVerified?: boolean | null;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signupWithCredentials: (
    name: string,
    email: string,
    pass: string,
    confirmPass: string
  ) => Promise<{ success: boolean; message?: string; error?: string }>;
  loginWithGoogle: () => void;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: (mode?: "login" | "signup") => void;
  closeAuthModal: () => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const isLoading = status === "loading";

  const user: User | null = session?.user
    ? {
        id: session.user.id || "user-id",
        name: session.user.name || "Sanctuary Member",
        email: session.user.email || "",
        avatar: session.user.image || session.user.name?.charAt(0).toUpperCase() || "U",
        plan: "premium",
        joinedDate: "Member",
        emailVerified: !!(session.user as { emailVerified?: Date | boolean | null }).emailVerified,
        provider: (session.user as { provider?: string }).provider || "email",
      }
    : null;

  const loginWithCredentials = async (email: string, pass: string) => {
    try {
      const res = await nextAuthSignIn("credentials", {
        email,
        password: pass,
        redirect: false,
      });

      if (res?.error) {
        return { success: false, error: "Invalid email or password." };
      }

      setAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: "An unexpected error occurred during login." };
    }
  };

  const signupWithCredentials = async (
    name: string,
    email: string,
    pass: string,
    confirmPass: string
  ) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pass, confirmPassword: confirmPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Signup failed." };
      }

      return { success: true, message: data.message };
    } catch {
      return { success: false, error: "An unexpected network error occurred." };
    }
  };

  const loginWithGoogle = () => {
    nextAuthSignIn("google", { callbackUrl: "/dashboard" });
  };

  const logout = () => {
    nextAuthSignOut({ callbackUrl: "/login" });
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
        isLoading,
        loginWithCredentials,
        signupWithCredentials,
        loginWithGoogle,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        authMode,
        setAuthMode,
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
