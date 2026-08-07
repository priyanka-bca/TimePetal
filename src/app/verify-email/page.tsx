"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, BookOpen, Mail } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resend state
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("No verification token provided in URL.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setSuccess(true);
        } else {
          setError(data.error || "Email verification failed.");
        }
      } catch {
        setError("An unexpected error occurred while verifying your email.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  // Cooldown countdown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail || resendCooldown > 0) return;

    setResendLoading(true);
    setResendMessage(null);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resendEmail.trim().toLowerCase() }),
      });

      const data = await res.json();
      setResendMessage(data.message || data.error);
      if (res.ok) {
        setResendCooldown(60); // 60s cooldown rate limit
      }
    } catch {
      setResendMessage("Failed to resend verification link.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-border/60 shadow-2xl">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold font-serif tracking-tight text-foreground hover:opacity-90 transition">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          TimePetal
        </Link>
        <h1 className="text-xl font-medium tracking-tight text-foreground/90">Email Verification</h1>
      </div>

      {loading ? (
        <div className="p-8 text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-amber-500" />
          <p className="text-sm text-muted-foreground">Verifying your email address...</p>
        </div>
      ) : success ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg">Email Verified!</h3>
          <p className="text-sm">Your email address has been verified. Welcome to your private digital diary sanctuary!</p>
          <Link
            href="/login?verified=true"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium text-sm hover:bg-amber-600 transition shadow-md"
          >
            Sign In to Continue
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>

          <div className="p-5 rounded-2xl bg-secondary/30 border border-border/50 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Need a new verification link?</h3>
            <form onSubmit={handleResend} className="space-y-3">
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full h-10 pl-9 pr-3 text-sm rounded-xl bg-background border border-border/80 text-foreground outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                disabled={resendLoading || resendCooldown > 0 || !resendEmail}
                className="w-full h-10 text-sm font-medium rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {resendLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  "Resend Verification Link"
                )}
              </button>
            </form>

            {resendMessage && (
              <p className="text-xs text-muted-foreground text-center mt-2">{resendMessage}</p>
            )}
          </div>

          <div className="text-center">
            <Link href="/login" className="text-xs text-amber-500 font-medium hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-secondary/20 to-background">
      <Suspense fallback={<div className="text-center p-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" /></div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
