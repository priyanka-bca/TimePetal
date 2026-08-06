"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Heart, Sparkles, Moon, Sun, Palette, Menu, X, ArrowRight, BookOpen, ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themeOptions: { id: "blush" | "lavender" | "sunset" | "midnight"; name: string; color: string }[] = [
    { id: "blush", name: "Blush Rose", color: "bg-rose-400" },
    { id: "lavender", name: "Lavender Mist", color: "bg-purple-400" },
    { id: "sunset", name: "Sunset Glow", color: "bg-amber-400" },
    { id: "midnight", name: "Midnight Calm", color: "bg-slate-700" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-rose-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-0.5 shadow-md shadow-rose-200/50 dark:shadow-none group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 group-hover:fill-rose-500 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            </span>
            <span className="text-[11px] font-medium text-rose-400 uppercase tracking-widest -mt-1">
              Private Memory Vault
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
          <Link href="#features" className="hover:text-rose-500 transition-colors">Features</Link>
          <Link href="#timeline" className="hover:text-rose-500 transition-colors">Timeline</Link>
          <Link href="#privacy" className="hover:text-rose-500 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Privacy First
          </Link>
          <Link href="#pricing" className="hover:text-rose-500 transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-rose-500 transition-colors">FAQ</Link>
        </nav>

        {/* Action controls & Theme selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-rose-500" />
              <span className="capitalize">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Select Theme Palette
                  </p>
                  {themeOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                        theme === t.id
                          ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                      {t.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Dashboard Entry CTA */}
          <Link
            href="/dashboard"
            className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm shadow-md shadow-rose-200 dark:shadow-none hover:shadow-lg transition-all flex items-center gap-2 group"
          >
            Open Diary
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-rose-50 dark:bg-slate-800 text-rose-600 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col gap-3 font-medium text-slate-700 dark:text-slate-200 text-base">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#timeline" onClick={() => setMobileMenuOpen(false)}>Memory Timeline</Link>
              <Link href="#privacy" onClick={() => setMobileMenuOpen(false)}>Privacy Guarantee</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Subscription Plans</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            </nav>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-center font-semibold text-sm shadow-md"
              >
                Go to My Private Vault
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
