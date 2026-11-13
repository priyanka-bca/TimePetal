"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  Settings,
  ShieldCheck,
  Download,
  User,
  CheckCircle2,
  Crown,
  Sparkles,
  Zap,
  CreditCard,
  RefreshCw,
  AlertCircle
} from "lucide-react";

function SettingsContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "yearly">("yearly");

  const paymentStatus = searchParams.get("payment");

  const handleExportData = () => {
    try {
      const entries = localStorage.getItem("deardiary_entries") || "[]";
      const moods = localStorage.getItem("deardiary_moods") || "[]";
      const letters = localStorage.getItem("deardiary_letters") || "[]";

      const fullBackup = {
        app: "TimePetal",
        exportedAt: new Date().toISOString(),
        user: user?.email || "anonymous",
        entries: JSON.parse(entries),
        moods: JSON.parse(moods),
        letters: JSON.parse(letters),
      };

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `timepetal_vault_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Export error", err);
    }
  };

  const handleStripeCheckout = async () => {
    setPaymentLoading(true);
    setPaymentError("");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedBilling,
          email: user?.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPaymentError(data.error || "Failed to initialize payment checkout.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setPaymentError("Network error while connecting to payment gateway.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-pink-500" /> Security & Billing
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Vault Settings
          </h1>
        </div>
      </div>

      {/* Payment Success Alert */}
      {paymentStatus === "success" && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">Payment Successful! Welcome to TimePetal Premium 🌸</p>
            <p className="font-normal text-emerald-700">Your account has been upgraded with unlimited AI reflections, future letters, and themes.</p>
          </div>
        </div>
      )}

      {/* Subscription & Payment Section */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold">
              <Crown className="w-3.5 h-3.5 text-pink-500" />
              {user?.isPremium || user?.plan === "premium" ? "Active Plan: TimePetal Premium" : "Current Plan: Free Explorer"}
            </div>
            <h2 className="font-serif text-2xl font-extrabold text-black">
              Membership & Billing
            </h2>
            <p className="text-xs text-black/70">
              Unlock unlimited AI memory chapters, future letters, and high-fidelity voice notes.
            </p>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold">
            <button
              onClick={() => setSelectedBilling("monthly")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedBilling === "monthly" ? "bg-white text-black shadow-sm font-extrabold" : "text-black/60"
              }`}
            >
              $4.99 / mo
            </button>
            <button
              onClick={() => setSelectedBilling("yearly")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                selectedBilling === "yearly" ? "bg-white text-black shadow-sm font-extrabold" : "text-black/60"
              }`}
            >
              $39.99 / yr <span className="text-[10px] bg-pink-200 text-pink-800 px-1.5 rounded-full">Save 33%</span>
            </button>
          </div>
        </div>

        {paymentError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{paymentError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-1">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <h3 className="font-extrabold text-sm text-black">Unlimited AI Insights</h3>
            <p className="text-[11px] text-black/70">No token limits on daily reflection prompts and summaries.</p>
          </div>
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-1">
            <Zap className="w-5 h-5 text-purple-500" />
            <h3 className="font-extrabold text-sm text-black">Time Capsule Vault</h3>
            <p className="text-[11px] text-black/70">Schedule and seal unlimited letters with delivery reminders.</p>
          </div>
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 space-y-1">
            <Crown className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-sm text-black">All Aesthetic Themes</h3>
            <p className="text-[11px] text-black/70">Blush Rose, Lavender Mist, Sunset Glow, and Midnight.</p>
          </div>
        </div>

        <button
          onClick={handleStripeCheckout}
          disabled={paymentLoading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {paymentLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
          {paymentLoading ? "Connecting to Stripe..." : `Upgrade with Stripe (${selectedBilling === "yearly" ? "$39.99/year" : "$4.99/month"})`}
        </button>
      </div>

      {/* Account Profile Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white shadow-sm">
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
            <User className="w-5 h-5 text-pink-500" /> Account Profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-extrabold">
            <div>
              <label className="text-black uppercase block mb-1">Display Name</label>
              <input
                type="text"
                readOnly
                value={user?.name || "Sanctuary Member"}
                className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-black font-extrabold cursor-default"
              />
            </div>
            <div>
              <label className="text-black uppercase block mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                value={user?.email || "member@timepetal.app"}
                className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-black font-extrabold cursor-default"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-pink-100 space-y-4">
          <h2 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-500" /> Data Portability & Export
          </h2>
          <p className="text-xs text-black font-semibold">
            Download your complete diary vault (all entries, photo links, and sealed time capsules) into a single secure JSON file.
          </p>

          <button
            onClick={handleExportData}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md border border-pink-300 flex items-center gap-2 btn-shimmer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-black" /> Vault Backup Exported!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" /> Export Complete Diary Vault (JSON)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[300px] flex items-center justify-center text-xs font-extrabold text-pink-600 gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" /> Loading Vault Settings...
        </div>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
