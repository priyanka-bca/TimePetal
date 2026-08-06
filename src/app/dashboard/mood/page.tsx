"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, MoodLog } from "@/lib/store";
import {
  Smile,
  Calendar,
  TrendingUp,
  BarChart2,
  Sparkles,
  Plus,
  Heart,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

export default function MoodAnalyticsPage() {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>([]);
  const [selectedMoodInput, setSelectedMoodInput] = useState<MoodLog["mood"]>("Calm");
  const [intensityInput, setIntensityInput] = useState(8);
  const [noteInput, setNoteInput] = useState("");
  const [logSuccess, setLogSuccess] = useState(false);

  useEffect(() => {
    setMoodLogs(getStoredData("deardiary_moods", []));
  }, []);

  const handleAddMood = () => {
    const newLog: MoodLog = {
      id: `m-${Date.now()}`,
      mood: selectedMoodInput,
      intensity: intensityInput,
      note: noteInput.trim() || undefined,
      date: new Date().toISOString()
    };
    const updated = [newLog, ...moodLogs];
    setMoodLogs(updated);
    setStoredData("deardiary_moods", updated);
    setLogSuccess(true);
    setNoteInput("");
    setTimeout(() => setLogSuccess(false), 2000);
  };

  const moodCounts = moodLogs.reduce((acc, item) => {
    acc[item.mood] = (acc[item.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalLogs = moodLogs.length || 1;

  const moodColorMap: Record<string, { emoji: string; bg: string; border: string; text: string }> = {
    Calm: { emoji: "😌", bg: "bg-emerald-100 dark:bg-emerald-950/60", border: "border-emerald-300", text: "text-emerald-700 dark:text-emerald-300" },
    Loved: { emoji: "🥰", bg: "bg-rose-100 dark:bg-rose-950/60", border: "border-rose-300", text: "text-rose-700 dark:text-rose-300" },
    Happy: { emoji: "😊", bg: "bg-amber-100 dark:bg-amber-950/60", border: "border-amber-300", text: "text-amber-700 dark:text-amber-300" },
    Excited: { emoji: "🤩", bg: "bg-pink-100 dark:bg-pink-950/60", border: "border-pink-300", text: "text-pink-700 dark:text-pink-300" },
    Sad: { emoji: "😔", bg: "bg-blue-100 dark:bg-blue-950/60", border: "border-blue-300", text: "text-blue-700 dark:text-blue-300" },
    Anxious: { emoji: "😰", bg: "bg-purple-100 dark:bg-purple-950/60", border: "border-purple-300", text: "text-purple-700 dark:text-purple-300" },
    Angry: { emoji: "😡", bg: "bg-red-100 dark:bg-red-950/60", border: "border-red-300", text: "text-red-700 dark:text-red-300" }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-rose-100 dark:border-slate-800">
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
          <Smile className="w-3.5 h-3.5" /> Emotional Wellness Suite
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Mood Tracking & Trends
        </h1>
      </div>

      {/* Log Mood Widget & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Log Mood Card */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
          <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-500" /> Log Today's Mood Check-in
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.keys(moodColorMap).map((mKey) => {
              const item = moodColorMap[mKey];
              const isSelected = selectedMoodInput === mKey;
              return (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setSelectedMoodInput(mKey as MoodLog["mood"])}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                    isSelected
                      ? `${item.bg} ${item.border} ${item.text} font-bold shadow-md`
                      : "bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs">{mKey}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Emotional Intensity</span>
              <span className="font-bold text-rose-500">{intensityInput}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={intensityInput}
              onChange={(e) => setIntensityInput(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="What triggered this mood? (e.g. Morning walk, matcha, family call...)"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-rose-400"
            />
          </div>

          <button
            onClick={handleAddMood}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {logSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Heart className="w-4 h-4" />}
            {logSuccess ? "Mood Logged!" : "Save Mood Check-in"}
          </button>
        </div>

        {/* AI Mood Insights Card */}
        <div className="glass-card rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" /> Compassionate AI Insights
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100">
              Emotional Rhythm
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
              "Your logs show that you feel most peaceful and peaceful when taking slow morning walks and writing in the evening. Keep nourishing these daily rituals!"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-xs text-rose-600 dark:text-rose-300 font-medium">
            💡 Pro Tip: Consistent logging unlocks deeper weekly trend charts.
          </div>
        </div>
      </div>

      {/* Mood Distribution & Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mood Distribution Progress Bars */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-rose-500" /> Emotional Distribution
          </h3>

          <div className="space-y-4">
            {Object.keys(moodColorMap).map((key) => {
              const count = moodCounts[key] || 0;
              const percent = Math.round((count / totalLogs) * 100);
              const info = moodColorMap[key];

              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <span className="flex items-center gap-1.5">
                      <span>{info.emoji}</span> {key}
                    </span>
                    <span>{percent}% ({count})</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${info.bg} ${info.text} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Mood Calendar Map */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> August Mood Map
            </h3>
            <span className="text-xs text-slate-400 font-semibold">2026</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 py-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d}>{d}</div>
            ))}

            {Array.from({ length: 28 }).map((_, idx) => {
              const sampleMoods = ["Calm", "Loved", "Happy", "Excited", "Calm", "Loved", "Happy"];
              const mName = sampleMoods[idx % sampleMoods.length];
              const info = moodColorMap[mName];

              return (
                <div
                  key={idx}
                  className={`h-10 sm:h-12 rounded-xl flex items-center justify-center text-base sm:text-lg ${info.bg} shadow-sm`}
                  title={`August ${idx + 1}: ${mName}`}
                >
                  {info.emoji}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
