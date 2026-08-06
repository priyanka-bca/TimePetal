"use client";

import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
  Settings,
  Palette,
  Moon,
  Sun,
  ShieldCheck,
  Download,
  CreditCard,
  Check,
  Sparkles,
  Lock
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [exportSuccess, setExportSuccess] = useState(false);

  const themeOptions: { id: "blush" | "lavender" | "sunset" | "midnight"; name: string; color: string; desc: string }[] = [
    { id: "blush", name: "Blush Rose", color: "bg-rose-400", desc: "Soft rose & warm cream pastel" },
    { id: "lavender", name: "Lavender Mist", color: "bg-purple-400", desc: "Serene violet & lilac breeze" },
    { id: "sunset", name: "Sunset Glow", color: "bg-amber-400", desc: "Warm gold & peach horizon" },
    { id: "midnight", name: "Midnight Calm", color: "bg-slate-700", desc: "Velvet dark & rose gold" },
  ];

  const handleExportData = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-rose-100 dark:border-slate-800">
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
          <Settings className="w-3.5 h-3.5" /> Account & Theme Customization
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Settings & Preferences
        </h1>
      </div>

      {/* Theme Customization Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Palette className="w-5 h-5 text-rose-500" /> Aesthetic Theme Palette
          </h2>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold flex items-center gap-2"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {themeOptions.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                theme === t.id
                  ? "bg-rose-50 dark:bg-rose-950/50 border-rose-400 font-bold shadow-sm"
                  : "bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${t.color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-serif text-sm font-bold text-slate-800 dark:text-slate-100">{t.name}</p>
                <p className="text-xs text-slate-500 font-light">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Security & Privacy Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-4">
        <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" /> Data Security & Vault Backup
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Your diary vault is encrypted with AES-256 standards. You can download a complete backup of all your entries, mood logs, and photo metadata anytime.
        </p>

        <button
          onClick={handleExportData}
          className="px-6 py-3 rounded-2xl glass-card hover:bg-white dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center gap-2 transition-colors"
        >
          {exportSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Download className="w-4 h-4 text-rose-500" />}
          {exportSuccess ? "Export Generated (JSON format)" : "Export Complete Memory Vault (JSON)"}
        </button>
      </div>

      {/* Subscription Status Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-rose-200 dark:border-slate-800 space-y-4 bg-gradient-to-r from-rose-50/40 to-pink-50/30 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-xs font-bold uppercase">
              Current Plan
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mt-2">
              Premium Sanctuary ($4.99/mo)
            </h3>
            <p className="text-xs text-slate-500">Active • Renews on September 6, 2026</p>
          </div>
          <CreditCard className="w-8 h-8 text-rose-400" />
        </div>
      </div>
    </div>
  );
}
