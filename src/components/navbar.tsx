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
    { id: "blush", name: "Pastel Pink", color: "bg-pink-300" },
    { id: "lavender", name: "Soft Blossom", color: "bg-pink-100" },
    { id: "sunset", name: "Cream Peach", color: "bg-amber-100" },
    { id: "midnight", name: "Rose Mist", color: "bg-rose-200" },
  ];

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[#FFF5F7]/95 border-b border-pink-200 transition-colors duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 4 }}
            whileTap={{ scale: 0.94 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 p-0.5 shadow-sm shadow-pink-200"
          >
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30 group-hover:fill-pink-500 transition-colors" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-black flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest -mt-1">
              Soft & Pastel Vault
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links - Solid Black Text */}
        <nav className="hidden md:flex items-center gap-8 font-bold text-sm text-black">
          <Link href="#features" className="text-black hover:opacity-70 transition-opacity">
            Features
          </Link>
          <Link href="#interactive-demo" className="text-black hover:opacity-70 transition-opacity">
            Interactive Demo
          </Link>
          <Link href="#privacy" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-pink-500" /> Privacy First
          </Link>
          <Link href="#pricing" className="text-black hover:opacity-70 transition-opacity">
            Pricing
          </Link>
          <Link href="#faq" className="text-black hover:opacity-70 transition-opacity">
            FAQ
          </Link>
        </nav>

        {/* Action controls & Theme selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-white text-black hover:bg-pink-50 transition-colors flex items-center gap-1.5 text-xs font-bold border border-pink-200 shadow-sm btn-shimmer"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-pink-500" />
              <span className="capitalize text-black">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-pink-200 shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-extrabold text-black uppercase tracking-wider px-3 py-1.5">
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
                          ? "bg-pink-100 text-black font-extrabold"
                          : "hover:bg-pink-50 text-black"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${t.color}`} />
                      <span className="text-black">{t.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-white text-black hover:bg-pink-50 transition-colors border border-pink-200 shadow-sm btn-shimmer"
            title="Toggle Theme Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>

          {/* Dashboard Entry CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/dashboard"
              className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 via-rose-300 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md shadow-pink-200 flex items-center gap-2 group border border-pink-300 btn-shimmer"
            >
              <span className="text-black">Open Diary</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white text-black border border-pink-200"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-pink-100 text-black border border-pink-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
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
            className="md:hidden border-b border-pink-200 bg-[#FFF5F7]/98 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col gap-3 font-extrabold text-black text-base">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-black">Features</Link>
              <Link href="#interactive-demo" onClick={() => setMobileMenuOpen(false)} className="text-black">Interactive Demo</Link>
              <Link href="#privacy" onClick={() => setMobileMenuOpen(false)} className="text-black">Privacy Guarantee</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-black">Subscription Plans</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-black">FAQ</Link>
            </nav>
            <div className="pt-4 border-t border-pink-200 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-black text-center font-extrabold text-sm shadow-md border border-pink-300 btn-shimmer"
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
