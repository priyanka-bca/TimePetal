"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Heart, Sparkles, Moon, Sun, Menu, X, ArrowRight, Clock, Smile, Mail, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themeOptions: { id: "blush" | "lavender" | "sunset" | "midnight"; name: string; icon: string }[] = [
    { id: "blush", name: "Soft Blush Pink", icon: "🌸" },
    { id: "lavender", name: "Aesthetic Lavender", icon: "🪻" },
    { id: "sunset", name: "Sunset Peach", icon: "🌅" },
    { id: "midnight", name: "Rose Mist", icon: "🌹" },
  ];

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 backdrop-blur-md bg-[#FAF5F0]/90 border-b border-[#EFE6D8] transition-colors duration-300 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 4 }}
            whileTap={{ scale: 0.94 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 p-0.5 shadow-sm shadow-pink-200"
          >
            <div className="w-full h-full bg-[#FAF5F0] rounded-[14px] flex items-center justify-center border border-[#EFE6D8]">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500/30 group-hover:fill-pink-500 transition-colors" />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-black flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest -mt-1">
              Minimal Private Sanctuary
            </span>
          </div>
        </Link>

        {/* 5 Core Feature Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 font-bold text-xs text-black">
          <Link href="/dashboard/ai" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> AI Companion
          </Link>
          <Link href="/dashboard/timeline" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-pink-500" /> Memory Timeline
          </Link>
          <Link href="/dashboard/mood" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <Smile className="w-3.5 h-3.5 text-pink-500" /> Mood Analytics
          </Link>
          <Link href="/dashboard/letters" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-pink-500" /> Future Letters
          </Link>
          <Link href="/dashboard/themes" className="text-black hover:opacity-70 transition-opacity flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-pink-500" /> Premium Themes
          </Link>
        </nav>

        {/* Action Controls: Theme Switcher & Day/Night Toggle & CTA */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Palette Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-[#FAF5F0] text-black hover:bg-pink-50 transition-all border border-[#EFE6D8] shadow-sm flex items-center gap-1.5 text-xs font-extrabold btn-shimmer"
              title="Select Premium Theme"
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
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#FAF5F0] border border-[#EFE6D8] shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-extrabold text-black uppercase tracking-wider px-3 py-1.5">
                    Select Theme Palette
                  </p>
                  {themeOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-colors ${
                        theme === t.id ? "bg-pink-200 text-black" : "hover:bg-pink-100 text-black"
                      }`}
                    >
                      <span className="text-base">{t.icon}</span>
                      <span className="text-black">{t.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Day / Night Mode Switcher Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-[#FAF5F0] text-black hover:bg-pink-50 transition-all border border-[#EFE6D8] shadow-sm flex items-center gap-1.5 text-xs font-extrabold btn-shimmer"
            title="Toggle Day / Night Mode"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-spin" style={{ animationDuration: "12s" }} />
                <span className="text-black">Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-pink-500 fill-pink-500/20" />
                <span className="text-black">Night Mode</span>
              </>
            )}
          </button>

          {/* Dashboard Entry CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/dashboard"
              className="ml-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-400 via-rose-300 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md shadow-pink-200 flex items-center gap-1.5 group border border-pink-300 btn-shimmer"
            >
              <span className="text-black">Open Vault</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-[#FAF5F0] text-black border border-[#EFE6D8]"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-pink-500" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#FAF5F0] text-black border border-[#EFE6D8]"
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
            className="lg:hidden border-b border-[#EFE6D8] bg-[#FAF5F0]/98 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col gap-3 font-extrabold text-black text-base">
              <Link href="/dashboard/ai" onClick={() => setMobileMenuOpen(false)} className="text-black">⭐ AI Diary Companion</Link>
              <Link href="/dashboard/timeline" onClick={() => setMobileMenuOpen(false)} className="text-black">⭐ Memory Timeline</Link>
              <Link href="/dashboard/mood" onClick={() => setMobileMenuOpen(false)} className="text-black">⭐ Mood Analytics</Link>
              <Link href="/dashboard/letters" onClick={() => setMobileMenuOpen(false)} className="text-black">⭐ Future Letters</Link>
              <Link href="/dashboard/themes" onClick={() => setMobileMenuOpen(false)} className="text-black">⭐ Premium Themes</Link>
            </nav>
            <div className="pt-4 border-t border-[#EFE6D8] flex flex-col gap-3">
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
