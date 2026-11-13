"use client";

import Link from "next/link";
import { ArrowLeft, LifeBuoy, Mail, MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/70 via-purple-50/50 to-pink-50/60 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to TimePetal
        </Link>

        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-rose-100/70 dark:border-slate-800 shadow-xl space-y-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-xs font-semibold">
              <LifeBuoy className="w-3.5 h-3.5" /> Customer Care
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              TimePetal Support Center
            </h1>
            <p className="text-sm text-slate-500">
              Need assistance with your vault, future letters, or account? We are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 space-y-2">
              <Mail className="w-6 h-6 text-rose-500" />
              <h3 className="font-serif text-base font-bold text-slate-800 dark:text-slate-100">Email Support</h3>
              <p className="text-xs text-slate-500 font-light">Direct email with our engineering and support team.</p>
              <p className="text-xs font-semibold text-rose-500 pt-1">support@timepetal.app</p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 space-y-2">
              <MessageCircle className="w-6 h-6 text-purple-500" />
              <h3 className="font-serif text-base font-bold text-slate-800 dark:text-slate-100">Community & Feedback</h3>
              <p className="text-xs text-slate-500 font-light">Feature requests, bug reports, and roadmap discussions.</p>
              <p className="text-xs font-semibold text-purple-500 pt-1">feedback@timepetal.app</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fast Response Guarantee
            </div>
            <p>Our team usually responds to user inquiries within 24 hours on business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
