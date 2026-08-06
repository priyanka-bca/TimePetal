"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/lib/auth";
import { getStoredData, DiaryEntry } from "@/lib/store";
import {
  Heart,
  BookOpen,
  Clock,
  Smile,
  Mail,
  Sparkles,
  Search,
  PlusCircle,
  Moon,
  Sun,
  Palette,
  Flame,
  ChevronRight,
  X,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout, openAuthModal } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const saved = getStoredData<DiaryEntry[]>("deardiary_entries", []);
    setEntries(saved);
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard Home", icon: BookOpen },
    { href: "/dashboard/journal", label: "Write Memory", icon: PlusCircle },
    { href: "/dashboard/ai", label: "AI Companion", icon: Sparkles },
    { href: "/dashboard/timeline", label: "Memory Timeline", icon: Clock },
    { href: "/dashboard/mood", label: "Mood Analytics", icon: Smile },
    { href: "/dashboard/letters", label: "Future Letters", icon: Mail },
    { href: "/dashboard/themes", label: "Premium Themes", icon: Palette },
  ];

  const searchResults = searchQuery.trim()
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen flex text-black bg-transparent transition-colors">
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden md:flex flex-col border-r border-[#EFE6D8] bg-[#FAF5F0]/95 backdrop-blur-xl p-5 justify-between sticky top-0 h-screen shadow-sm">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 px-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-300 to-pink-400 p-0.5 shadow-sm shadow-pink-200">
              <div className="w-full h-full bg-[#FAF5F0] rounded-[10px] flex items-center justify-center border border-[#EFE6D8]">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-black">
                DearDiary
              </h1>
              <p className="text-[10px] text-pink-600 font-extrabold uppercase tracking-wider">
                Private Vault
              </p>
            </div>
          </Link>

          {/* Quick Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE6] hover:bg-pink-50 text-black text-xs font-bold flex items-center justify-between transition-colors border border-[#EFE6D8]"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-pink-500" /> Search memories...
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#FAF5F0] border border-[#EFE6D8] text-[10px] font-mono text-black">
              ⌘K
            </kbd>
          </button>

          {/* Streamlined Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-md shadow-pink-200 border border-pink-300"
                      : "text-black hover:bg-pink-100 hover:text-black"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-black" />
                    {item.label}
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Session Footer */}
        <div className="pt-4 border-t border-[#EFE6D8] space-y-3">
          <div className="p-3 rounded-xl bg-[#F5EFE6] text-black border border-[#EFE6D8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-xs font-extrabold">14 Day Streak</span>
            </div>
            <span className="text-[10px] font-extrabold text-pink-600 uppercase">On Fire</span>
          </div>

          <div className="flex items-center justify-between px-2">
            {user ? (
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center font-serif font-extrabold text-black text-xs flex-shrink-0">
                  {user.avatar || user.name.charAt(0)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-extrabold text-black truncate">{user.name}</span>
                  <span className="text-[10px] text-pink-600 font-bold truncate">{user.plan === "premium" ? "Premium Vault" : "Free Member"}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="text-xs font-extrabold text-pink-600 hover:underline flex items-center gap-1"
              >
                <UserIcon className="w-3.5 h-3.5" /> Sign In
              </button>
            )}

            <div className="flex items-center gap-1">
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-lg bg-[#FAF5F0] text-black border border-[#EFE6D8]"
                title="Toggle Theme Mode"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-pink-500" />}
              </button>
              {user && (
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg bg-[#FAF5F0] text-red-600 border border-[#EFE6D8] hover:bg-red-50"
                  title="Log Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile App Header Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#EFE6D8] bg-[#FAF5F0]/95 backdrop-blur-md sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="font-serif font-bold text-black text-lg">DearDiary</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl bg-[#FAF5F0] text-black border border-[#EFE6D8]"
            >
              <Search className="w-4 h-4 text-pink-500" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-[#FAF5F0] text-black border border-[#EFE6D8]"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-pink-500" />}
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>

        {/* Mobile Bottom Navigation Toolbar */}
        <nav className="md:hidden sticky bottom-0 z-40 bg-[#FAF5F0]/95 backdrop-blur-lg border-t border-[#EFE6D8] px-2 py-2 flex items-center justify-around">
          {navItems.slice(1, 6).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-xl flex flex-col items-center gap-0.5 text-[10px] font-extrabold transition-colors ${
                  isActive ? "text-pink-600 font-extrabold" : "text-black"
                }`}
              >
                <Icon className="w-5 h-5 text-black" />
                <span className="text-black">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-pink-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#FAF5F0] rounded-3xl shadow-2xl border border-[#EFE6D8] overflow-hidden"
            >
              <div className="p-4 border-b border-[#EFE6D8] flex items-center gap-3">
                <Search className="w-5 h-5 text-pink-500" />
                <input
                  type="text"
                  placeholder="Search entries, keywords, tags, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm focus:outline-none text-black placeholder-zinc-400 font-extrabold"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-lg bg-[#F5EFE6] text-black border border-[#EFE6D8]"
                >
                  <X className="w-4 h-4 text-black" />
                </button>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto space-y-2">
                {searchQuery.trim() === "" ? (
                  <p className="text-xs text-black text-center py-6 font-bold">Type anything to search across your diary vault...</p>
                ) : searchResults.length === 0 ? (
                  <p className="text-xs text-black text-center py-6 font-bold">No matching memories found for "{searchQuery}".</p>
                ) : (
                  searchResults.map((entry) => (
                    <Link
                      key={entry.id}
                      href="/dashboard/timeline"
                      onClick={() => setSearchOpen(false)}
                      className="p-3 rounded-xl hover:bg-pink-100 flex items-center justify-between transition-colors group block border border-[#EFE6D8]"
                    >
                      <div>
                        <p className="font-extrabold text-sm text-black">
                          {entry.title}
                        </p>
                        <p className="text-xs text-black line-clamp-1 font-medium">{entry.content.replace(/<[^>]*>?/gm, "")}</p>
                      </div>
                      <span className="text-[10px] font-extrabold text-pink-600">{entry.mood}</span>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
