"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Database, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-3.5 h-3.5" /> Privacy First
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400">
              Last updated: November 2026 • Effective immediately
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-500" /> 1. Our Privacy Pledge
              </h2>
              <p>
                At <strong>TimePetal</strong>, your private thoughts, journal entries, mood logs, and future letters belong solely to you. We believe digital memories should be as intimate and secure as a physical locked diary. We do not sell your personal data, nor do we train public AI models on your private writing.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-500" /> 2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Account Information:</strong> Email address and profile details provided during signup.</li>
                <li><strong>Journal & Mood Content:</strong> Entries, photos, and mood logs you choose to store.</li>
                <li><strong>Future Letters:</strong> Scheduled letters encrypted until the specified unlock date.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-emerald-500" /> 3. Data Protection & Encryption
              </h2>
              <p>
                All data transmitted to and from TimePetal is encrypted using TLS 1.3. User data at rest is protected with AES-256 standards. Only authenticated account owners can read and manage their private vault.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-500" /> 4. Contact Us
              </h2>
              <p>
                If you have any questions or requests regarding your data, contact our team at:
              </p>
              <p className="font-medium text-rose-500">support@timepetal.app</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
