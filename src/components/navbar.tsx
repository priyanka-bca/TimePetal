"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Heart, Sparkles, Moon, Sun, Palette, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themeOptions: { id: "blush" | "lavender" | "sunset" | "midnight"; name: string; color: string }[] = [
    { id: "blush", name: "Aesthetic Pink", color: "bg-pink-400" },
    { id: "lavender", name: "Cream Blossom", color: "bg-amber-100" },
    { id: "sunset", name: "Soft Coral", color: "bg-rose-300" },
    { id: "midnight", name: "Minimal Dark", color: "bg-zinc-800" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF5F0]/90 dark:bg-zinc-900/90 border-b border-pink-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-pink-400 p-0.5 shadow-sm shadow-pink-200 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[14px] flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30 group-hover:fill-pink-500 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-black dark:text-white flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-semibold text-pink-500 uppercase tracking-widest -mt-1">
              Minimal Private Vault
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-black dark:text-zinc-300">
          <Link href="#features" className="hover:text-pink-500 transition-colors">Features</Link>
          <Link href="#interactive-demo" className="hover:text-pink-500 transition-colors">Interactive Demo</Link>
          <Link href="#privacy" className="hover:text-pink-500 transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-pink-500" /> Privacy First
          </Link>
          <Link href="#pricing" className="hover:text-pink-500 transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-pink-500 transition-colors">FAQ</Link>
        </nav>

        {/* Action controls & Theme selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-pink-50 transition-colors flex items-center gap-1.5 text-xs font-semibold border border-pink-100 dark:border-zinc-700"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="capitalize">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                    Select Theme
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
                          ? "bg-pink-50 text-pink-600 font-semibold"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800 text-black dark:text-white"
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
            className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-pink-50 transition-colors border border-pink-100 dark:border-zinc-700"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>

          {/* Dashboard Entry CTA */}
          <Link
            href="/dashboard"
            className="ml-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-md shadow-pink-200 dark:shadow-none transition-all flex items-center gap-2 group"
          >
            Open Diary
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white border border-pink-100"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-pink-50 text-pink-600 dark:text-white"
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
            className="md:hidden border-b border-pink-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col gap-3 font-medium text-black dark:text-white text-base">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#interactive-demo" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</Link>
              <Link href="#privacy" onClick={() => setMobileMenuOpen(false)}>Privacy Guarantee</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Subscription Plans</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            </nav>
            <div className="pt-4 border-t border-pink-100 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-pink-500 text-white text-center font-semibold text-sm shadow-md"
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
