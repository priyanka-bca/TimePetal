"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredData, DiaryEntry, MoodLog, PhotoItem, FutureLetter } from "@/lib/store";
import {
  Heart,
  PlusCircle,
  Clock,
  Smile,
  Camera,
  Mail,
  Sparkles,
  Flame,
  Calendar as CalendarIcon,
  ArrowRight,
  Star,
  CloudRain,
  Sun,
  Volume2
} from "lucide-react";

export default function DashboardPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [moods, setMoods] = useState<MoodLog[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [letters, setLetters] = useState<FutureLetter[]>([]);

  useEffect(() => {
    setEntries(getStoredData("deardiary_entries", []));
    setMoods(getStoredData("deardiary_moods", []));
    setPhotos(getStoredData("deardiary_photos", []));
    setLetters(getStoredData("deardiary_letters", []));
  }, []);

  const recentEntries = entries.slice(0, 3);
  const favoriteEntries = entries.filter((e) => e.isFavorite);
  const todaysEntry = entries.find(
    (e) => new Date(e.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-8 text-black dark:text-white">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 bg-white dark:bg-zinc-900 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold inline-flex items-center gap-1.5 border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Good Morning, Sophia ✨
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            How does your heart feel today?
          </h1>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            You are on a <span className="font-bold text-pink-500">14-day writing streak</span>. Capture today's soft moments and preserve them forever.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard/journal"
              className="px-6 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md shadow-pink-200 flex items-center gap-2 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              {todaysEntry ? "Edit Today's Journal" : "Write Today's Memory"}
            </Link>
            <Link
              href="/dashboard/ai"
              className="px-5 py-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-black dark:text-white text-xs font-bold border border-pink-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              Daily Reflection Prompt
            </Link>
          </div>
        </div>

        {/* Ambient Decorative Heart Icon */}
        <Heart className="absolute right-4 bottom-4 w-48 h-48 text-pink-200/40 pointer-events-none -rotate-12" />
      </div>

      {/* Quick Metrics & Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <Link
          href="/dashboard/timeline"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-pink-100 flex items-center justify-between bg-white dark:bg-zinc-900"
        >
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Total Memories</p>
            <p className="font-serif text-2xl font-bold text-black dark:text-white mt-1">
              {entries.length} Entries
            </p>
            <p className="text-[10px] text-black dark:text-white font-bold mt-1">Stored securely</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </Link>

        {/* Metric 2 */}
        <Link
          href="/dashboard/mood"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-pink-100 flex items-center justify-between bg-white dark:bg-zinc-900"
        >
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Dominant Mood</p>
            <p className="font-serif text-2xl font-bold text-black dark:text-white mt-1">
              😌 Calm
            </p>
            <p className="text-[10px] text-pink-600 font-bold mt-1">88% Positive trends</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </div>
        </Link>

        {/* Metric 3 */}
        <Link
          href="/dashboard/albums"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-pink-100 flex items-center justify-between bg-white dark:bg-zinc-900"
        >
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Photo Vault</p>
            <p className="font-serif text-2xl font-bold text-black dark:text-white mt-1">
              {photos.length} Photos
            </p>
            <p className="text-[10px] text-pink-600 font-bold mt-1">2 Albums created</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
        </Link>

        {/* Metric 4 */}
        <Link
          href="/dashboard/letters"
          className="glass-card glass-card-hover rounded-2xl p-5 border border-pink-100 flex items-center justify-between bg-white dark:bg-zinc-900"
        >
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">Future Letters</p>
            <p className="font-serif text-2xl font-bold text-black dark:text-white mt-1">
              {letters.length} Sealed
            </p>
            <p className="text-[10px] text-black dark:text-white font-bold mt-1">Time capsules active</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Main Grid Section: Recent Entries & Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Recent Memories Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-black dark:text-white flex items-center gap-2">
              Recent Memories <span className="text-xs font-sans font-semibold text-zinc-600">({entries.length})</span>
            </h2>
            <Link
              href="/dashboard/timeline"
              className="text-xs font-bold text-pink-500 hover:text-pink-600 flex items-center gap-1"
            >
              View Timeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-pink-100 space-y-3 bg-white dark:bg-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
                      {entry.mood} ({entry.moodRating}/10)
                    </span>
                    {entry.weather && (
                      <span className="text-xs text-zinc-600 font-medium flex items-center gap-1">
                        {entry.weather}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-zinc-600 font-semibold">
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-black dark:text-white">
                  {entry.title}
                </h3>

                <div
                  className="text-zinc-800 dark:text-zinc-200 text-sm line-clamp-2 leading-relaxed font-normal"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />

                <div className="pt-2 flex items-center justify-between border-t border-pink-100 text-xs text-zinc-600">
                  <div className="flex items-center gap-2">
                    {entry.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-pink-50 text-black text-[11px] font-semibold border border-pink-100">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {entry.photos.length > 0 && (
                    <span className="text-pink-600 font-bold flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> {entry.photos.length} Photos
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Mood Distribution & Photo Snippets */}
        <div className="space-y-6">
          {/* Mood Trends Snippet */}
          <div className="glass-card rounded-2xl p-6 border border-pink-100 space-y-4 bg-white dark:bg-zinc-900">
            <h3 className="font-serif text-lg font-bold text-black dark:text-white flex items-center gap-2">
              <Smile className="w-4 h-4 text-pink-500" /> Weekly Mood Balance
            </h3>

            <div className="space-y-2.5 text-xs font-bold text-black">
              <div>
                <div className="flex justify-between text-black dark:text-white mb-1">
                  <span>Calm & Peaceful</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-400 h-full w-[45%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-black dark:text-white mb-1">
                  <span>Loved & Cherished</span>
                  <span>35%</span>
                </div>
                <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-500 h-full w-[35%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-black dark:text-white mb-1">
                  <span>Excited & Creative</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-pink-300 h-full w-[20%]" />
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/mood"
              className="block w-full text-center py-2.5 rounded-xl bg-pink-50 text-black text-xs font-bold hover:bg-pink-100 transition-colors border border-pink-100"
            >
              Open Full Mood Analytics
            </Link>
          </div>

          {/* Photo Vault Quick Preview */}
          <div className="glass-card rounded-2xl p-6 border border-pink-100 space-y-4 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-black dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-500" /> Photo Memories
              </h3>
              <Link href="/dashboard/albums" className="text-xs text-pink-500 font-bold">View All</Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {photos.slice(0, 4).map((p) => (
                <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={p.url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 text-[10px] text-white font-medium">
                    {p.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
