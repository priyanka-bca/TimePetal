"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Lock,
  Calendar,
  Smile,
  Mic,
  Camera,
  Mail,
  Search,
  Sparkle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Star,
  Zap,
  BookOpen,
  Cloud,
  FileText,
  Volume2,
  Clock
} from "lucide-react";

export default function LandingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<"journal" | "timeline" | "mood" | "letters">("journal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const faqs = [
    {
      q: "Is my personal diary data completely private and secure?",
      a: "Yes. Your privacy is our sacred core principle. All entries, photo uploads, and future letters are encrypted at rest with industry-standard AES-256 and transmitted over TLS 1.3. We never sell your data or train public AI models on your private memories."
    },
    {
      q: "How do Future Letters work?",
      a: "Future Letters act as digital time capsules. You write a letter to your future self, family, or friends, set an unlock date (e.g. 1 year from now), and DearDiary safely seals it with a countdown. On the deliver date, you receive a gentle email notification and your letter unlocks."
    },
    {
      q: "Can I use DearDiary offline or export my entries?",
      a: "Absolutely! You can export your entire diary, mood logs, and photo albums into clean JSON or formatted PDF files at any time with a single click in your account settings."
    },
    {
      q: "Is the AI Assistant optional?",
      a: "Yes. The AI reflection assistant is 100% optional and only runs when you explicitly click for journaling prompts, memory summaries, or daily quotes."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-rose-200 dark:selection:bg-rose-900 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Soft background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-300/30 via-pink-200/20 to-purple-300/30 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-rose-200/60 dark:border-rose-900/40 text-xs font-semibold text-rose-600 dark:text-rose-400 mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
            <span>Introducing DearDiary 2.0 • Your Sanctuary for Life&apos;s Softest Moments</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]"
          >
            Your private space for{" "}
            <span className="gradient-text italic font-serif">memories, thoughts,</span> and emotions.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            A calm, aesthetic, end-to-end private sanctuary where you can write daily journals, record voice clips, track mood trends, preserve photo albums, and seal letters to your future self.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-base shadow-xl shadow-rose-300/40 dark:shadow-none hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              Start Writing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#interactive-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card hover:bg-white/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-base border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Sparkle className="w-4 h-4 text-rose-500" />
              Explore Live Demo
            </a>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 dark:text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-emerald-500" /> 256-Bit Encrypted Vault
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-500" /> Zero Ad Trackers
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 12,000+ Journalers
            </span>
          </motion.div>

          {/* Floating UI Hero Card Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/60 dark:border-slate-800 backdrop-blur-xl relative">
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-500" /> deardiary.app/dashboard/journal
                </div>
                <div className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Auto-Saved
                </div>
              </div>

              {/* Mock Dashboard Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Left Card: Entry Summary */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-rose-500" /> Mood: Calm & Grateful
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Thursday, August 6, 2026</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-100">
                    A Quiet Sunday Morning with Matcha & Warm Rain
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
                    Woke up to the gentle patter of raindrops against the bedroom window. Brewed a fresh cup of ceremonial matcha, wrapped myself in cashmere, and listened to classical piano while watching the fog settle...
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                      #Mindfulness
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
                      #SlowLiving
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-xs font-medium flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> Voice Note attached (0:42)
                    </span>
                  </div>
                </div>

                {/* Right Card: Quick Stats Widget */}
                <div className="glass-card rounded-2xl p-5 border border-slate-100 dark:border-slate-800/80 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Writing Streak</span>
                      <span className="font-bold text-rose-500">🔥 14 Days</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full w-[85%]" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500">AI Daily Reflection</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                      &ldquo;You seem most calm on rainy mornings. Remember to breathe deeply today.&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">Photos Vault</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">128 Memories</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="interactive-demo" className="py-20 bg-white/60 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Designed for tranquility and effortless expression.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-base">
              Try out the core modules of DearDiary right here before creating your private account.
            </p>

            {/* Tab Selectors */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 gap-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActivePreviewTab("journal")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "journal"
                    ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <FileText className="w-4 h-4" /> Daily Journal
              </button>
              <button
                onClick={() => setActivePreviewTab("timeline")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "timeline"
                    ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Clock className="w-4 h-4" /> Memory Timeline
              </button>
              <button
                onClick={() => setActivePreviewTab("mood")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "mood"
                    ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Smile className="w-4 h-4" /> Mood Analytics
              </button>
              <button
                onClick={() => setActivePreviewTab("letters")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "letters"
                    ? "bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <Mail className="w-4 h-4" /> Future Letters
              </button>
            </div>
          </div>

          {/* Active Tab Preview Display */}
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-rose-100 dark:border-slate-800">
            <AnimatePresence mode="wait">
              {activePreviewTab === "journal" && (
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                        Rich Text Journal Editor
                      </h4>
                      <p className="text-xs text-slate-500">Format text, attach voice clips, assign weather & location tags.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-semibold flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5" /> Record Audio
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> Add Photos
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 font-serif text-slate-700 dark:text-slate-200">
                    <p className="text-lg font-bold text-rose-500">Title: Walking through the Kyoto bamboo forest</p>
                    <p className="text-sm font-sans leading-relaxed text-slate-600 dark:text-slate-300">
                      The sunlight filtered through the tall emerald stems like glowing ribbons. I stood still for five minutes just listening to the rustle of leaves...
                    </p>
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                      Memory Timeline & Filters
                    </h4>
                    <span className="text-xs font-medium text-rose-500">Filter by Year • Mood • Tag</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-500 font-bold text-sm">
                          AUG 06
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">Matcha Morning & Warm Rain</p>
                          <p className="text-xs text-slate-500">Calm • #Mindfulness • Kyoto</p>
                        </div>
                      </div>
                      <span className="text-xs text-amber-500 font-semibold">★ Favorite</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-500 font-bold text-sm">
                          AUG 03
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">Sunset Stroll Along Botanical Coast</p>
                          <p className="text-xs text-slate-500">Loved • #Family • Sunset</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">1 Photo</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "mood" && (
                <motion.div
                  key="mood"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                      Emotional Trends & Mood Calendar
                    </h4>
                    <span className="text-xs text-emerald-500 font-semibold">88% Positive Emotions This Month</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 py-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                    {[
                      { emoji: "😌", bg: "bg-emerald-100 text-emerald-700" },
                      { emoji: "🥰", bg: "bg-rose-100 text-rose-700" },
                      { emoji: "🤩", bg: "bg-amber-100 text-amber-700" },
                      { emoji: "😊", bg: "bg-pink-100 text-pink-700" },
                      { emoji: "😌", bg: "bg-emerald-100 text-emerald-700" },
                      { emoji: "🥰", bg: "bg-rose-100 text-rose-700" },
                      { emoji: "😌", bg: "bg-emerald-100 text-emerald-700" }
                    ].map((item, idx) => (
                      <div key={idx} className={`h-12 rounded-xl flex items-center justify-center text-lg ${item.bg}`}>
                        {item.emoji}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "letters" && (
                <motion.div
                  key="letters"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                      Sealed Future Time Capsule Letters
                    </h4>
                    <span className="text-xs text-indigo-500 font-semibold">Automatic Email Notification</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 border border-purple-200 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        🔒 Sealed Letter to Future Self
                      </span>
                      <span className="text-xs text-slate-500">Unlocks: Feb 20, 2027</span>
                    </div>
                    <p className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100">
                      &ldquo;To Me on My 30th Birthday: Are You Still Living Softly?&rdquo;
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      Sealed with 256-bit encryption. Countdown active: 180 Days remaining.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Everything you need to preserve your life&apos;s story.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Carefully engineered with feminine elegance, deep privacy, and joyful self-reflection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-rose-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Daily Journal</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Rich text formatting, mood tags, location and weather markers, voice clips, and photo attachments in a minimal editor.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-purple-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Memory Timeline</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Look back on your journey through a visual timeline filtered by years, months, emotional states, and custom tags.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-amber-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
                <Smile className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Mood Tracking</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Log daily emotional intensity, discover patterns, view monthly calendars, and gain compassionate mood insights.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-pink-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-500 flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Private Photo Albums</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Organize precious moments into curated albums, favorite special shots, and link photos directly to journal entries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-indigo-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">Future Time Capsules</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Write letters to your future self or loved ones with scheduled unlock dates and automated email notifications.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card glass-card-hover rounded-3xl p-8 border border-emerald-100 dark:border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">AI Reflection Companion</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Get daily writing prompts, summarize memory chapters, and receive gentle emotional reflections when you feel stuck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Guarantee Section */}
      <section id="privacy" className="py-20 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-3xl mx-auto">
            Your thoughts belong to you. Always.
          </h2>
          <p className="mt-4 text-white/90 text-lg max-w-2xl mx-auto font-light">
            We built DearDiary with zero tracking, database encryption, and complete export portability so your heart&apos;s memories stay strictly private.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Simple, transparent pricing.
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Start writing completely free today. Upgrade anytime for unlimited memories & AI reflection tools.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedPlan === "monthly" ? "bg-white dark:bg-slate-900 text-rose-500 shadow-sm" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  selectedPlan === "yearly" ? "bg-white dark:bg-slate-900 text-rose-500 shadow-sm" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Yearly Billing <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold">SAVE 30%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase">
                  Free Forever
                </span>
                <h3 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-4">$0</h3>
                <p className="text-xs text-slate-500">Perfect for casual daily journaling.</p>

                <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Up to 50 Diary Entries
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Memory Timeline & Search
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Basic Mood Tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Photo Album
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard Theme Selection
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl glass-card hover:bg-white dark:hover:bg-slate-800 text-center text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card rounded-3xl p-8 border-2 border-rose-400 dark:border-rose-500 space-y-6 flex flex-col justify-between relative shadow-xl shadow-rose-200/30 dark:shadow-none">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                Most Popular
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase">
                  Premium Sanctuary
                </span>
                <div className="flex items-baseline gap-1 mt-4">
                  <h3 className="font-serif text-4xl font-bold text-slate-900 dark:text-white">
                    {selectedPlan === "yearly" ? "$4.99" : "$6.99"}
                  </h3>
                  <span className="text-xs text-slate-500">/ month {selectedPlan === "yearly" && "(billed annually)"}</span>
                </div>
                <p className="text-xs text-rose-500 font-medium">Includes 14-day free trial. Cancel anytime.</p>

                <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> Unlimited Diary Entries & Photos
                  </li>
                  <li className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> AI Prompts, Summarization & Reflections
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> Voice Notes Recorder & Audio Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> Future Time Capsule Letters & Reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500" /> Custom Themes (*Blush*, *Lavender*, *Sunset*, *Midnight*)
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white text-center font-bold text-sm shadow-md shadow-rose-300/50 dark:shadow-none transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-white/60 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
              Have questions? We&apos;re here to help you feel safe and confident.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-between gap-4"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-rose-500 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-serif font-bold text-slate-800 dark:text-slate-200 text-sm">DearDiary</span>
            <span>© 2026 DearDiary Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="#privacy" className="hover:text-rose-500 transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-rose-500 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="hover:text-rose-500 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
