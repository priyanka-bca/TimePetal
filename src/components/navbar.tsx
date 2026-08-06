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
    { id: "blush", name: "Sweet Summer", color: "bg-[#E09789]" },
    { id: "lavender", name: "Soft Blush", color: "bg-[#F5D4C3]" },
    { id: "sunset", name: "Sage Mint", color: "bg-[#C8DBD7]" },
    { id: "midnight", name: "Forest Slate", color: "bg-[#3C5556]" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F6EFE7]/85 dark:bg-[#3C5556]/90 border-b border-[#E09789]/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#E09789] p-0.5 shadow-md shadow-[#E09789]/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#F6EFE7] dark:bg-[#3C5556] rounded-[14px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#E09789] fill-[#E09789]/30 group-hover:fill-[#E09789] transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3C5556] dark:text-[#F6EFE7] flex items-center gap-1.5">
              DearDiary
              <span className="inline-block w-2 h-2 rounded-full bg-[#E09789] animate-pulse" />
            </span>
            <span className="text-[11px] font-medium text-[#E09789] uppercase tracking-widest -mt-1">
              Sweet Summer Vault
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#3C5556] dark:text-[#C8DBD7]">
          <Link href="#features" className="hover:text-[#E09789] transition-colors">Features</Link>
          <Link href="#interactive-demo" className="hover:text-[#E09789] transition-colors">Interactive Demo</Link>
          <Link href="#privacy" className="hover:text-[#E09789] transition-colors flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#3C5556]" /> Privacy First
          </Link>
          <Link href="#pricing" className="hover:text-[#E09789] transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-[#E09789] transition-colors">FAQ</Link>
        </nav>

        {/* Action controls & Theme selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2.5 rounded-xl bg-[#F5D4C3]/40 dark:bg-[#3C5556] text-[#3C5556] dark:text-[#F6EFE7] hover:bg-[#E09789]/20 transition-colors flex items-center gap-1.5 text-xs font-semibold border border-[#E09789]/30"
              title="Change Theme"
            >
              <Palette className="w-4 h-4 text-[#E09789]" />
              <span className="capitalize">{theme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#F6EFE7] dark:bg-[#3C5556] border border-[#E09789]/40 shadow-xl p-2 z-50"
                >
                  <p className="text-[10px] font-bold text-[#3C5556]/60 dark:text-[#C8DBD7] uppercase tracking-wider px-3 py-1.5">
                    Select Palette
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
                          ? "bg-[#F5D4C3] text-[#3C5556] font-semibold"
                          : "hover:bg-[#E9F1EF] dark:hover:bg-[#273839] text-[#3C5556] dark:text-[#F6EFE7]"
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
            className="p-2.5 rounded-xl bg-[#F5D4C3]/40 dark:bg-[#3C5556] text-[#3C5556] dark:text-[#F6EFE7] hover:bg-[#E09789]/20 transition-colors border border-[#E09789]/30"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#F5D4C3]" /> : <Moon className="w-4 h-4 text-[#3C5556]" />}
          </button>

          {/* Dashboard Entry CTA */}
          <Link
            href="/dashboard"
            className="ml-2 px-5 py-2.5 rounded-xl bg-[#E09789] hover:bg-[#c88173] text-[#F6EFE7] font-medium text-sm shadow-md shadow-[#E09789]/30 transition-all flex items-center gap-2 group"
          >
            Open Diary
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-[#F5D4C3]/40 dark:bg-[#3C5556] text-[#3C5556] dark:text-[#F6EFE7]"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#F5D4C3]" /> : <Moon className="w-4 h-4 text-[#3C5556]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#E09789]/20 text-[#3C5556] dark:text-[#F6EFE7]"
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
            className="md:hidden border-b border-[#E09789]/30 bg-[#F6EFE7]/95 dark:bg-[#3C5556]/95 backdrop-blur-lg px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col gap-3 font-medium text-[#3C5556] dark:text-[#F6EFE7] text-base">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#interactive-demo" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</Link>
              <Link href="#privacy" onClick={() => setMobileMenuOpen(false)}>Privacy Guarantee</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>Subscription Plans</Link>
              <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            </nav>
            <div className="pt-4 border-t border-[#E09789]/30 flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#E09789] text-[#F6EFE7] text-center font-semibold text-sm shadow-md"
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
