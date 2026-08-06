"use client";

import { useState } from "react";
import { Sparkles, Bot, Heart, RefreshCw, Send, BookOpen, Quote, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiAssistantPage() {
  const [activeTab, setActiveTab] = useState<"prompts" | "summary" | "reflection">("prompts");
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const samplePrompts = [
    "What is a small, unexpected kindness you experienced this week?",
    "Describe a room or corner where you feel 100% safe and peaceful.",
    "What advice would you give to the person you were three years ago?",
    "List five sensory details from your morning (textures, aromas, sounds)."
  ];

  const handleGenerate = (type: string) => {
    setLoading(true);
    setGeneratedResult(null);
    setTimeout(() => {
      setLoading(false);
      if (type === "prompts") {
        setGeneratedResult(
          `🌸 Today's AI Journal Prompts:\n\n1. "What is one fear you quietly let go of this month?"\n2. "Describe the golden hour light in your favorite place."\n3. "Who made your heart feel warm today?"`
        );
      } else if (type === "summary") {
        setGeneratedResult(
          `📖 Memory Chapter Summary (August 2026):\n\n"This month was defined by quiet matcha mornings, warm coastal walks, and monumental creative milestones. You hit 50,000 words on your novel draft and re-connected deeply with your family. Your emotional tone was 88% calm and loved."`
        );
      } else {
        setGeneratedResult(
          `✨ Gentle Emotional Reflection:\n\n"You have been cultivating slow living with intentional grace. Even on rainy days, you find solace in small rituals. Remember that rest is not earned—it is essential to your wellbeing."`
        );
      }
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-rose-100 dark:border-slate-800">
        <span className="text-xs font-semibold text-purple-500 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" /> AI Reflection Companion
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Writing Prompts & Memory Insights
        </h1>
      </div>

      {/* Tabs Selector */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit text-xs font-bold">
        <button
          onClick={() => {
            setActiveTab("prompts");
            setGeneratedResult(null);
          }}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "prompts" ? "bg-white dark:bg-slate-900 text-purple-600 shadow-sm" : "text-slate-500"
          }`}
        >
          Daily Prompts
        </button>
        <button
          onClick={() => {
            setActiveTab("summary");
            setGeneratedResult(null);
          }}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "summary" ? "bg-white dark:bg-slate-900 text-purple-600 shadow-sm" : "text-slate-500"
          }`}
        >
          Memory Summarizer
        </button>
        <button
          onClick={() => {
            setActiveTab("reflection");
            setGeneratedResult(null);
          }}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === "reflection" ? "bg-white dark:bg-slate-900 text-purple-600 shadow-sm" : "text-slate-500"
          }`}
        >
          Emotional Reflection
        </button>
      </div>

      {/* Action Generator Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
              {activeTab === "prompts" && "Generate Personal Writing Prompts"}
              {activeTab === "summary" && "Summarize Recent Memory Chapters"}
              {activeTab === "reflection" && "Receive Gentle Reflection Guidance"}
            </h3>
            <p className="text-xs text-slate-500 font-light">
              100% private. Runs on demand without recording external logs.
            </p>
          </div>

          <button
            onClick={() => handleGenerate(activeTab)}
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? "Reflecting..." : "Generate AI Insights"}
          </button>
        </div>

        {/* Display Output */}
        <AnimatePresence mode="wait">
          {generatedResult ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 font-serif text-sm leading-relaxed whitespace-pre-line"
            >
              {generatedResult}
            </motion.div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              Click the button above to generate personalized AI journaling prompts or memory reflections.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Recommended Prompts Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Curated Journaling Starters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {samplePrompts.map((p, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-100 dark:border-slate-800 space-y-2">
              <Quote className="w-4 h-4 text-purple-400" />
              <p className="font-serif text-sm font-bold text-slate-800 dark:text-slate-200">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
