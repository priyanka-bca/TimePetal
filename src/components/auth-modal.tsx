"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Mail, User as UserIcon, ArrowRight, X, CheckCircle2, ShieldCheck } from "lucide-react";

export function AuthModal() {
  const {
    authModalOpen,
    closeAuthModal,
    authMode,
    setAuthMode,
    login,
    signup,
    loginWithGoogle
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    if (authMode === "signup" && !name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (authMode === "login") {
      login(email, password);
      setSuccessMsg("Welcome back to your private vault!");
    } else {
      signup(name, email, password);
      setSuccessMsg("Account created successfully! Opening your vault...");
    }
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pink-950/30 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-md bg-[#FAF5F0] rounded-3xl p-6 sm:p-8 border border-[#EFE6D8] shadow-2xl space-y-6 relative my-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 p-1.5 rounded-xl bg-[#F5EFE6] text-black border border-[#EFE6D8] hover:bg-pink-100 transition-colors"
            >
              <X className="w-4 h-4 text-black" />
            </button>

            {/* Brand Logo Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 p-0.5 mx-auto shadow-sm shadow-pink-200">
                <div className="w-full h-full bg-[#FAF5F0] rounded-[14px] flex items-center justify-center border border-[#EFE6D8]">
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500/20" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-extrabold text-black">
                {authMode === "login" ? "Welcome Back to DearDiary" : "Create Your Sanctuary Account"}
              </h2>
              <p className="text-xs text-black font-semibold">
                Your private memories are encrypted with 256-bit AES protection.
              </p>
            </div>

            {/* Tabs: Login / Signup */}
            <div className="flex p-1 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8]">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setErrorMsg("");
                }}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                  authMode === "login"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black hover:text-pink-600"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("signup");
                  setErrorMsg("");
                }}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                  authMode === "signup"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black hover:text-pink-600"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Google OAuth Quick Button */}
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full py-3 rounded-2xl bg-white hover:bg-pink-50 text-black font-extrabold text-xs border border-[#EFE6D8] shadow-sm flex items-center justify-center gap-2 transition-all btn-shimmer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#EFE6D8] w-full" />
              <span className="bg-[#FAF5F0] px-3 text-[10px] font-extrabold text-black uppercase tracking-wider relative z-10">
                Or with Email
              </span>
            </div>

            {/* Error / Success Alerts */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-200 text-red-700 text-xs font-bold text-center">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-xl bg-green-100 border border-green-200 text-green-800 text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" /> {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div>
                  <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-pink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Sophia Rose"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-pink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="sophia@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-pink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md border border-pink-300 flex items-center justify-center gap-2 btn-shimmer"
              >
                <span>{authMode === "login" ? "Open Vault" : "Create My Account"}</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-black pt-2 border-t border-[#EFE6D8]">
              <ShieldCheck className="w-4 h-4 text-pink-500" />
              <span>Zero Ad Trackers • 256-Bit Encrypted Sanctuary</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
