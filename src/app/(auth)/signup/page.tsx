"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Mail, Lock, User as UserIcon, AlertCircle, ArrowRight, Loader2, BookOpen, CheckCircle2, XCircle } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Real-time password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasNumber && hasSpecial;
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!isPasswordValid) {
      setError("Please ensure your password meets all requirements below.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed. Please try again.");
      } else {
        setSuccessMessage(data.message || "Account created successfully! Please check your email to verify your account.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("Failed to initialize Google sign up.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/60 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold font-serif tracking-tight text-foreground hover:opacity-90 transition">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            TimePetal
          </Link>
          <h1 className="text-xl font-medium tracking-tight text-foreground/90">Begin your journal journey</h1>
          <p className="text-sm text-muted-foreground">Create a private account in seconds</p>
        </div>

        {successMessage ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Check Your Email</h3>
            <p className="text-sm leading-relaxed">{successMessage}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full h-12 flex items-center justify-center gap-3 px-4 rounded-2xl bg-secondary/80 hover:bg-secondary text-foreground font-medium border border-border transition shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-50"
            >
              {googleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              )}
              <span>Sign up with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60"></div>
              </div>
              <span className="relative px-4 text-xs uppercase tracking-wider text-muted-foreground bg-background/80 backdrop-blur rounded-full">
                Or create email account
              </span>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sophia Rose"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-secondary/40 border border-border/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-foreground placeholder:text-muted-foreground/60 transition outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-secondary/40 border border-border/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-foreground placeholder:text-muted-foreground/60 transition outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-secondary/40 border border-border/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-foreground placeholder:text-muted-foreground/60 transition outline-none"
                  />
                </div>
              </div>

              {/* Password strength checklist */}
              {password.length > 0 && (
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-xs space-y-1">
                  <div className="font-medium text-muted-foreground mb-1">Password requirements:</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {hasMinLength ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      At least 8 chars
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {hasUppercase ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      1 uppercase letter
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {hasNumber ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      1 number
                    </div>
                    <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {hasSpecial ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      1 special symbol
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-11 pr-4 rounded-2xl bg-secondary/40 border border-border/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-foreground placeholder:text-muted-foreground/60 transition outline-none"
                  />
                </div>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-destructive mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading || !isPasswordValid || !passwordsMatch}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium shadow-lg shadow-amber-500/20 transition active:scale-[0.99] disabled:opacity-50 mt-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-amber-500 hover:text-amber-400 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
