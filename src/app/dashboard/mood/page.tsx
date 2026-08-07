"use client";

import { useEffect, useState } from "react";
import { getStoredData, DiaryEntry } from "@/lib/store";
import { Smile, TrendingUp, Calendar, Heart, Sparkles, Filter } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@/lib/auth";

export default function MoodPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    setEntries(getStoredData("deardiary_entries", [], user?.id));
  }, [user]);

  const moodCounts = entries.reduce((acc, curr) => {
    acc[curr.mood] = (acc[curr.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodItems = [
    { mood: "Happy", emoji: "😊", bg: "bg-pink-100 text-black border-pink-200" },
    { mood: "Calm", emoji: "😌", bg: "bg-pink-100 text-black border-pink-200" },
    { mood: "Loved", emoji: "🥰", bg: "bg-pink-200 text-black border-pink-300" },
    { mood: "Excited", emoji: "🤩", bg: "bg-pink-100 text-black border-pink-200" },
    { mood: "Sad", emoji: "😔", bg: "bg-pink-50 text-black border-pink-200" },
    { mood: "Anxious", emoji: "😰", bg: "bg-pink-50 text-black border-pink-200" },
    { mood: "Angry", emoji: "😡", bg: "bg-pink-50 text-black border-pink-200" },
  ];

  return (
    <div className="space-y-8 text-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-pink-500" /> Emotional Well-being
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Mood Analytics & Calendar
          </h1>
        </div>
      </div>

      {/* Mood Distribution Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {moodItems.map((item) => (
          <div
            key={item.mood}
            className={`glass-card rounded-2xl p-4 text-center border space-y-1 bg-white ${item.bg}`}
          >
            <span className="text-3xl block">{item.emoji}</span>
            <p className="font-extrabold text-sm text-black">{item.mood}</p>
            <p className="text-xs font-extrabold text-pink-600">
              {moodCounts[item.mood] || 0} Logs
            </p>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mood Insights */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-pink-200 space-y-6 bg-white">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <h3 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-500" /> Compassionate Mood Insights
            </h3>
            <span className="text-xs font-extrabold text-black">August 2026</span>
          </div>

          <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-extrabold text-black uppercase">AI Emotional Reflection</span>
            </div>
            <p className="text-sm text-black leading-relaxed font-semibold">
              &ldquo;Your overall mood trends show a high frequency of Calm and Loved states (88% positive). Writing on rainy mornings boosts your emotional score significantly.&rdquo;
            </p>
          </div>

          {/* Monthly Mood Calendar Mock */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-extrabold text-black">Monthly Calendar View</h4>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-black">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="py-1 text-black font-extrabold">{d}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-xs font-extrabold text-black hover:bg-pink-100 transition-colors"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Triggers */}
        <div className="glass-card rounded-3xl p-6 border border-pink-200 space-y-4 bg-white">
          <h3 className="font-serif text-xl font-extrabold text-black">Top Mood Triggers</h3>
          <ul className="space-y-3 text-xs font-extrabold text-black">
            <li className="p-3 rounded-xl bg-pink-50 border border-pink-200 flex justify-between">
              <span>☕ Ceremonial Matcha</span>
              <span className="text-pink-600">+10 Mood</span>
            </li>
            <li className="p-3 rounded-xl bg-pink-50 border border-pink-200 flex justify-between">
              <span>🌧️ Morning Rain</span>
              <span className="text-pink-600">+8 Mood</span>
            </li>
            <li className="p-3 rounded-xl bg-pink-50 border border-pink-200 flex justify-between">
              <span>🎹 Classical Piano</span>
              <span className="text-pink-600">+7 Mood</span>
            </li>
            <li className="p-3 rounded-xl bg-pink-50 border border-pink-200 flex justify-between">
              <span>🎋 Kyoto Walk</span>
              <span className="text-pink-600">+9 Mood</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
