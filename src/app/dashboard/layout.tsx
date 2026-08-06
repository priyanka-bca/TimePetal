"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { getStoredData, DiaryEntry } from "@/lib/store";
import {
  Heart,
  BookOpen,
  Clock,
  Smile,
  Camera,
  Mail,
  Sparkles,
  Search,
  Settings,
  PlusCircle,
  LogOut,
  Moon,
  Sun,
  Palette,
  Flame,
  ShieldAlert,
  ChevronRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const saved = getStoredData<DiaryEntry[]>("deardiary_entries", []);
    setEntries(saved);
  }, []);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: BookOpen },
    { href: "/dashboard/journal", label: "Daily Journal", icon: PlusCircle },
    { href: "/dashboard/timeline", label: "Memory Timeline", icon: Clock },
    { href: "/dashboard/mood", label: "Mood Analytics", icon: Smile },
    { href: "/dashboard/albums", label: "Photo Vault", icon: Camera },
    { href: "/dashboard/letters", label: "Future Letters", icon: Mail },
    { href: "/dashboard/ai", label: "AI Companion", icon: Sparkles },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
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
    <div className="min-h-screen flex text-black dark:text-white transition-colors">
      {/* Sidebar Navigation */}
      <aside className="w-64 hidden md:flex flex-col border-r border-pink-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-5 justify-between sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 px-2 group">
            <div className="w-10 h-10 rounded-xl bg-pink-400 p-0.5 shadow-sm shadow-pink-200">
              <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[10px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />
              </div>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-black dark:text-white">
                DearDiary
              </h1>
              <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">
                Minimal Sanctuary
              </p>
            </div>
          </Link>

          {/* Quick Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-pink-50 dark:bg-zinc-800 hover:bg-pink-100/80 text-black dark:text-white text-xs font-semibold flex items-center justify-between transition-colors border border-pink-100 dark:border-zinc-700"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-pink-500" /> Search memories...
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-900 border border-pink-200 text-[10px] font-mono text-black">
              ⌘K
            </kbd>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-pink-500 text-white shadow-md shadow-pink-200"
                      : "text-black dark:text-zinc-300 hover:bg-pink-50 hover:text-pink-600"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-black dark:text-zinc-400"}`} />
                    {item.label}
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Streak */}
        <div className="pt-4 border-t border-pink-100 dark:border-zinc-800 space-y-3">
          {/* Writing Streak Badge */}
          <div className="p-3 rounded-xl bg-pink-50 text-black border border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-xs font-bold">14 Day Streak</span>
            </div>
            <span className="text-[10px] font-bold text-pink-600 uppercase">On Fire</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center font-serif font-bold text-white text-xs">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-black dark:text-white">Sophia Rose</span>
                <span className="text-[10px] text-zinc-600 font-medium">Premium Member</span>
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-pink-50 dark:bg-zinc-800 text-black dark:text-white border border-pink-100"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-pink-500" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile App Header Bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-pink-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md sticky top-0 z-40">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            <span className="font-serif font-bold text-black dark:text-white text-lg">DearDiary</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl bg-pink-50 dark:bg-zinc-800 text-black dark:text-white"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-pink-50 dark:bg-zinc-800 text-black dark:text-white"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-pink-500" />}
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto">{children}</main>

        {/* Mobile Bottom Navigation Toolbar */}
        <nav className="md:hidden sticky bottom-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-t border-pink-100 dark:border-zinc-800 px-2 py-2 flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-xl flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors ${
                  isActive ? "text-pink-500" : "text-black dark:text-zinc-400"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-pink-200 overflow-hidden"
            >
              <div className="p-4 border-b border-pink-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-pink-500" />
                <input
                  type="text"
                  placeholder="Search entries, keywords, tags, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm focus:outline-none text-black dark:text-white placeholder-zinc-400 font-semibold"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-lg bg-pink-50 dark:bg-zinc-800 text-black dark:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto space-y-2">
                {searchQuery.trim() === "" ? (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center py-6 font-medium">Type anything to search across your diary vault...</p>
                ) : searchResults.length === 0 ? (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 text-center py-6 font-medium">No matching memories found for "{searchQuery}".</p>
                ) : (
                  searchResults.map((entry) => (
                    <Link
                      key={entry.id}
                      href="/dashboard/timeline"
                      onClick={() => setSearchOpen(false)}
                      className="p-3 rounded-xl hover:bg-pink-50 flex items-center justify-between transition-colors group block"
                    >
                      <div>
                        <p className="font-bold text-sm text-black dark:text-white group-hover:text-pink-600">
                          {entry.title}
                        </p>
                        <p className="text-xs text-zinc-600 line-clamp-1">{entry.content.replace(/<[^>]*>?/gm, "")}</p>
                      </div>
                      <span className="text-[10px] font-bold text-pink-500">{entry.mood}</span>
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
