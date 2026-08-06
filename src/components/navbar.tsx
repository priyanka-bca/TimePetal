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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF5F0]/90 dark:bg-zinc-900/90 border-b border-pink-100 dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-2xl bg-pink-400 p-0.5 shadow-sm shadow-pink-200"
          >
            <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[14px] flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30 group-hover:fill-pink-500 transition-colors" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-black dark:text-white flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-bold text-black dark:text-white uppercase tracking-widest -mt-1">
              Minimal Private Vault
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Pure Black Text Without Hover Color Shift */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-black dark:text-white">
          <Link href="#features" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
            Features
          </Link>
          <Link href="#interactive-demo" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
            Interactive Demo
          </Link>
          <Link href="#privacy" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-pink-500" /> Privacy First
          </Link>
          <Link href="#pricing" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
            Pricing
          </Link>
          <Link href="#faq" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
            FAQ
          </Link>
        </nav>

        {/* Action controls & Theme selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-pink-50 transition-colors flex items-center gap-1.5 text-xs font-bold border border-pink-100 dark:border-zinc-700"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="capitalize text-black dark:text-white">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-100 dark:border-zinc-800 shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-bold text-black dark:text-white uppercase tracking-wider px-3 py-1.5">
                    Select Theme
                  </p>
                  {themeOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                        theme === t.id
                          ? "bg-pink-50 text-black dark:text-white font-extrabold"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800 text-black dark:text-white"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                      <span className="text-black dark:text-white">{t.name}</span>
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
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/dashboard"
              className="ml-2 px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-md shadow-pink-200 dark:shadow-none transition-all flex items-center gap-2 group"
            >
              <span className="text-white">Open Diary</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
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
            className="p-2.5 rounded-xl bg-pink-50 text-black dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-black dark:text-white" /> : <Menu className="w-6 h-6 text-black dark:text-white" />}
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
            <nav className="flex flex-col gap-3 font-bold text-black dark:text-white text-base">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white">Features</Link>
              <Link href="#interactive-demo" onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white">Interactive Demo</Link>
              <Link href="#privacy" onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white">Privacy Guarantee</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white">Subscription Plans</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-black dark:text-white">FAQ</Link>
            </nav>
            <div className="pt-4 border-t border-pink-100 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-pink-500 text-white text-center font-bold text-sm shadow-md"
              >
                Go to My Private Vault
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
