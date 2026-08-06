"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getStoredData, DiaryEntry, MoodLog, FutureLetter } from "@/lib/store";
import {
  Heart,
  PlusCircle,
  Clock,
  Smile,
  Mail,
  Sparkles,
  Flame,
  ArrowRight,
  Palette,
  CheckCircle2,
  Volume2
} from "lucide-react";

export default function DashboardPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [moods, setMoods] = useState<MoodLog[]>([]);
  const [letters, setLetters] = useState<FutureLetter[]>([]);

  useEffect(() => {
    setEntries(getStoredData("deardiary_entries", []));
    setMoods(getStoredData("deardiary_moods", []));
    setLetters(getStoredData("deardiary_letters", []));
  }, []);

  const recentEntries = entries.slice(0, 3);
  const todaysEntry = entries.find(
    (e) => new Date(e.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-8 text-black">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#EFE6D8] bg-[#FAF5F0] relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-3">
          <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-black text-xs font-extrabold inline-flex items-center gap-1.5 border border-[#EFE6D8] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> Good Morning, Sophia ✨
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            How does your heart feel today?
          </h1>
          <p className="text-sm text-black font-semibold">
            You are on a <span className="font-extrabold text-pink-600">14-day writing streak</span>. Your private memories & time capsules are protected with 256-bit AES encryption.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard/journal"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md shadow-pink-200 border border-pink-300 flex items-center gap-2 transition-all hover:scale-105 btn-shimmer"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              {todaysEntry ? "Edit Today's Journal" : "Write Today's Memory"}
            </Link>
            <Link
              href="/dashboard/ai"
              className="px-5 py-3 rounded-2xl bg-[#F5EFE6] text-black text-xs font-extrabold border border-[#EFE6D8] flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-pink-500" />
              Daily AI Reflection
            </Link>
          </div>
        </div>

        {/* Decorative Heart Icon */}
        <Heart className="absolute right-4 bottom-4 w-48 h-48 text-pink-200/50 pointer-events-none -rotate-12" />
      </div>

      {/* 5 Core Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Core 1: AI Companion */}
        <Link
          href="/dashboard/ai"
          className="glass-card glass-card-hover rounded-2xl p-4 border border-[#EFE6D8] flex flex-col justify-between bg-[#FAF5F0] space-y-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] text-pink-500 flex items-center justify-center border border-[#EFE6D8]">
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <p className="font-serif text-base font-extrabold text-black">AI Companion</p>
            <p className="text-[10px] text-black font-semibold mt-0.5">Gentle prompts & reflections</p>
          </div>
        </Link>

        {/* Core 2: Memory Timeline */}
        <Link
          href="/dashboard/timeline"
          className="glass-card glass-card-hover rounded-2xl p-4 border border-[#EFE6D8] flex flex-col justify-between bg-[#FAF5F0] space-y-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] text-pink-500 flex items-center justify-center border border-[#EFE6D8]">
            <Clock className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <p className="font-serif text-base font-extrabold text-black">Memory Timeline</p>
            <p className="text-[10px] text-black font-semibold mt-0.5">{entries.length} Entries stored</p>
          </div>
        </Link>

        {/* Core 3: Mood Analytics */}
        <Link
          href="/dashboard/mood"
          className="glass-card glass-card-hover rounded-2xl p-4 border border-[#EFE6D8] flex flex-col justify-between bg-[#FAF5F0] space-y-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] text-pink-500 flex items-center justify-center border border-[#EFE6D8]">
            <Smile className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <p className="font-serif text-base font-extrabold text-black">Mood Analytics</p>
            <p className="text-[10px] text-black font-semibold mt-0.5">😌 Calm (88% Positive)</p>
          </div>
        </Link>

        {/* Core 4: Future Letters */}
        <Link
          href="/dashboard/letters"
          className="glass-card glass-card-hover rounded-2xl p-4 border border-[#EFE6D8] flex flex-col justify-between bg-[#FAF5F0] space-y-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] text-pink-500 flex items-center justify-center border border-[#EFE6D8]">
            <Mail className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <p className="font-serif text-base font-extrabold text-black">Future Letters</p>
            <p className="text-[10px] text-black font-semibold mt-0.5">{letters.length} Sealed capsules</p>
          </div>
        </Link>

        {/* Core 5: Premium Themes */}
        <Link
          href="/dashboard/themes"
          className="glass-card glass-card-hover rounded-2xl p-4 border border-[#EFE6D8] flex flex-col justify-between bg-[#FAF5F0] space-y-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#F5EFE6] text-pink-500 flex items-center justify-center border border-[#EFE6D8]">
            <Palette className="w-4 h-4 text-pink-500" />
          </div>
          <div>
            <p className="font-serif text-base font-extrabold text-black">Premium Themes</p>
            <p className="text-[10px] text-black font-semibold mt-0.5">5 Aesthetics active</p>
          </div>
        </Link>
      </div>

      {/* Main Grid: Recent Memories & Feature Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Recent Memories Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-extrabold text-black flex items-center gap-2">
              Recent Memories <span className="text-xs font-sans font-bold text-black">({entries.length})</span>
            </h2>
            <Link
              href="/dashboard/timeline"
              className="text-xs font-extrabold text-pink-600 hover:opacity-80 flex items-center gap-1"
            >
              View Full Timeline <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentEntries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card glass-card-hover rounded-2xl p-6 border border-[#EFE6D8] space-y-3 bg-[#FAF5F0]"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#F5EFE6] text-black text-xs font-extrabold border border-[#EFE6D8]">
                    {entry.mood} ({entry.moodRating}/10)
                  </span>
                  <span className="text-xs text-black font-extrabold">
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-extrabold text-black">
                  {entry.title}
                </h3>

                <div
                  className="text-black text-sm line-clamp-2 leading-relaxed font-normal"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: AI & Future Letters Quick Widgets */}
        <div className="space-y-6">
          {/* AI Daily Companion Prompt */}
          <div className="glass-card rounded-2xl p-6 border border-[#EFE6D8] space-y-4 bg-[#FAF5F0]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-extrabold text-black flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" /> AI Reflection Prompt
              </h3>
            </div>
            <p className="text-xs text-black italic font-bold leading-relaxed">
              &ldquo;What is one small thing that brought peace to your heart today? Write it down to seal the memory.&rdquo;
            </p>
            <Link
              href="/dashboard/ai"
              className="block w-full text-center py-2.5 rounded-xl bg-[#F5EFE6] text-black text-xs font-extrabold hover:bg-pink-50 transition-colors border border-[#EFE6D8]"
            >
              Open AI Companion Chat
            </Link>
          </div>

          {/* Sealed Time Capsule Quick Preview */}
          <div className="glass-card rounded-2xl p-6 border border-[#EFE6D8] space-y-4 bg-[#FAF5F0]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-extrabold text-black flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" /> Sealed Future Letters
              </h3>
              <Link href="/dashboard/letters" className="text-xs text-pink-600 font-extrabold">View All</Link>
            </div>
            {letters.slice(0, 2).map((letter) => (
              <div key={letter.id} className="p-3 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-1">
                <p className="font-extrabold text-xs text-black">{letter.title}</p>
                <p className="text-[10px] text-pink-600 font-bold">Unlocks: {letter.deliverDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
