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
    <div className="min-h-screen text-black dark:text-white selection:bg-pink-200 selection:text-black transition-colors">
      <Navbar />

      {/* Hero Section with Cinematic Background & Floating Particles */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Ambient aesthetic pink & cream cinematic glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-pink-200/50 via-rose-100/40 to-amber-100/40 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />

        {/* Cinematic Floating 3D Graphic Accents */}
        <motion.div
          animate={{ y: [0, -18, 0], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[12%] pointer-events-none opacity-50 text-pink-400 text-3xl drop-shadow-md"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [0, 22, 0], rotate: [0, -14, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 right-[10%] pointer-events-none opacity-45 text-pink-300 text-4xl drop-shadow-md"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [0, -14, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-[6%] pointer-events-none opacity-40 text-amber-300 text-2xl drop-shadow-sm"
        >
          ✨
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-500 fill-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-xs font-bold text-black dark:text-white">
              Introducing DearDiary 2.0 • Your Minimal Sanctuary for Memories
            </span>
          </motion.div>

          {/* Main Headline - Solid Black Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black dark:text-white max-w-4xl mx-auto leading-[1.15]"
          >
            Your private space for{" "}
            <span className="gradient-text italic font-serif text-black">memories, thoughts,</span> and emotions.
          </motion.h1>

          {/* Subtitle - Solid Black Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-black dark:text-white max-w-2xl mx-auto font-medium leading-relaxed"
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
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-base shadow-xl shadow-pink-200 transition-all flex items-center justify-center gap-2 group"
              >
                <span className="text-white">Start Writing Free</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="#interactive-demo"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-zinc-800 hover:bg-white text-black dark:text-white font-bold text-base border border-pink-200 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkle className="w-4 h-4 text-pink-500" />
                <span className="text-black dark:text-white">Explore Live Demo</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Highlights - Pure Black Text Without Hover Shift */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-black dark:text-white"
          >
            <span className="flex items-center gap-1.5 text-black dark:text-white">
              <Lock className="w-4 h-4 text-black dark:text-white" /> 256-Bit Encrypted Vault
            </span>
            <span className="flex items-center gap-1.5 text-black dark:text-white">
              <ShieldCheck className="w-4 h-4 text-pink-500" /> Zero Ad Trackers
            </span>
            <span className="flex items-center gap-1.5 text-black dark:text-white">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 12,000+ Journalers
            </span>
          </motion.div>

          {/* Floating Cinematic UI Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="mt-16 relative max-w-5xl mx-auto perspective-1000"
          >
            <div className="glass-card rounded-3xl p-4 sm:p-8 shadow-2xl border border-pink-200 relative bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl">
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-pink-100 dark:border-zinc-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="px-4 py-1 rounded-full bg-pink-50 dark:bg-zinc-800 text-[11px] font-bold text-black dark:text-white flex items-center gap-1.5 border border-pink-100">
                  <Lock className="w-3 h-3 text-pink-500" /> deardiary.app/dashboard/journal
                </div>
                <div className="text-xs font-bold text-pink-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" /> Auto-Saved
                </div>
              </div>

              {/* Mock Dashboard Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Left Card: Entry Summary */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-pink-100 text-black text-xs font-extrabold flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-pink-600" /> Mood: Calm & Grateful
                    </span>
                    <span className="text-xs text-black dark:text-white font-bold">Thursday, August 6, 2026</span>
                  </div>

                  <h3 className="font-serif text-2xl font-extrabold text-black dark:text-white">
                    A Quiet Sunday Morning with Matcha & Warm Rain
                  </h3>

                  <p className="text-black dark:text-white text-sm leading-relaxed font-normal">
                    Woke up to the gentle patter of raindrops against the bedroom window. Brewed a fresh cup of ceremonial matcha, wrapped myself in cashmere, and listened to classical piano while watching the fog settle...
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-zinc-800 text-black dark:text-white text-xs font-bold border border-pink-200">
                      #Mindfulness
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-pink-50 dark:bg-zinc-800 text-black dark:text-white text-xs font-bold border border-pink-200">
                      #SlowLiving
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-black bg-emerald-100 text-xs font-bold flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> Voice Note attached (0:42)
                      <span className="flex items-center gap-0.5 ml-1">
                        <span className="w-1 bg-emerald-600 rounded-full animate-wave-1" />
                        <span className="w-1 bg-emerald-600 rounded-full animate-wave-2" />
                        <span className="w-1 bg-emerald-600 rounded-full animate-wave-3" />
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right Card: Quick Stats Widget */}
                <div className="glass-card rounded-2xl p-5 border border-pink-200 space-y-4 flex flex-col justify-between bg-white dark:bg-zinc-800">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-black dark:text-white font-bold">
                      <span>Writing Streak</span>
                      <span className="font-extrabold text-pink-500">🔥 14 Days</span>
                    </div>
                    <div className="w-full bg-pink-100 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="bg-pink-500 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-pink-50 dark:bg-zinc-900 border border-pink-200 space-y-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600">AI Daily Reflection</p>
                    <p className="text-xs text-black dark:text-white italic font-bold">
                      &ldquo;You seem most calm on rainy mornings. Remember to breathe deeply today.&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-black dark:text-white font-bold">Photos Vault</span>
                    <span className="font-extrabold text-black dark:text-white">128 Memories</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section with Scroll Reveal */}
      <section id="interactive-demo" className="py-20 bg-white/90 dark:bg-zinc-900/90 border-y border-pink-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
              Designed for tranquility and effortless expression.
            </h2>
            <p className="mt-4 text-black dark:text-white text-base font-medium">
              Try out the core modules of DearDiary right here before creating your private account.
            </p>

            {/* Tab Selectors */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-pink-50 dark:bg-zinc-800 gap-1 border border-pink-200">
              <button
                onClick={() => setActivePreviewTab("journal")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "journal"
                    ? "bg-pink-500 text-white shadow-sm"
                    : "text-black dark:text-white hover:text-black"
                }`}
              >
                <FileText className="w-4 h-4 text-black dark:text-white" /> Daily Journal
              </button>
              <button
                onClick={() => setActivePreviewTab("timeline")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "timeline"
                    ? "bg-pink-500 text-white shadow-sm"
                    : "text-black dark:text-white hover:text-black"
                }`}
              >
                <Clock className="w-4 h-4 text-black dark:text-white" /> Memory Timeline
              </button>
              <button
                onClick={() => setActivePreviewTab("mood")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "mood"
                    ? "bg-pink-500 text-white shadow-sm"
                    : "text-black dark:text-white hover:text-black"
                }`}
              >
                <Smile className="w-4 h-4 text-black dark:text-white" /> Mood Analytics
              </button>
              <button
                onClick={() => setActivePreviewTab("letters")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "letters"
                    ? "bg-pink-500 text-white shadow-sm"
                    : "text-black dark:text-white hover:text-black"
                }`}
              >
                <Mail className="w-4 h-4 text-black dark:text-white" /> Future Letters
              </button>
            </div>
          </motion.div>

          {/* Active Tab Preview Display */}
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-200 bg-white dark:bg-zinc-900">
            <AnimatePresence mode="wait">
              {activePreviewTab === "journal" && (
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-extrabold text-black dark:text-white">
                        Rich Text Journal Editor
                      </h4>
                      <p className="text-xs text-black dark:text-white font-medium">Format text, attach voice clips, assign weather & location tags.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-pink-100 text-black text-xs font-bold flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5 text-pink-600" /> Record Audio
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-pink-50 text-black text-xs font-bold flex items-center gap-1 border border-pink-200">
                        <Camera className="w-3.5 h-3.5 text-black" /> Add Photos
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF5F0] dark:bg-zinc-800 border border-pink-200 space-y-3 font-serif text-black dark:text-white">
                    <p className="text-lg font-extrabold text-black dark:text-white">Title: Walking through the Kyoto bamboo forest</p>
                    <p className="text-sm font-sans leading-relaxed text-black dark:text-white font-normal">
                      The sunlight filtered through the tall emerald stems like glowing ribbons. I stood still for five minutes just listening to the rustle of leaves...
                    </p>
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black dark:text-white">
                      Memory Timeline & Filters
                    </h4>
                    <span className="text-xs font-extrabold text-black dark:text-white">Filter by Year • Mood • Tag</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#FAF5F0] dark:bg-zinc-800 border border-pink-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-200 text-black flex items-center justify-center font-extrabold text-xs">
                          AUG 06
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-black dark:text-white">Matcha Morning & Warm Rain</p>
                          <p className="text-xs text-black dark:text-white font-semibold">Calm • #Mindfulness • Kyoto</p>
                        </div>
                      </div>
                      <span className="text-xs text-amber-500 font-extrabold">★ Favorite</span>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF5F0] dark:bg-zinc-800 border border-pink-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 text-black flex items-center justify-center font-extrabold text-xs">
                          AUG 03
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-black dark:text-white">Sunset Stroll Along Botanical Coast</p>
                          <p className="text-xs text-black dark:text-white font-semibold">Loved • #Family • Sunset</p>
                        </div>
                      </div>
                      <span className="text-xs text-black dark:text-white font-bold">1 Photo</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "mood" && (
                <motion.div
                  key="mood"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black dark:text-white">
                      Emotional Trends & Mood Calendar
                    </h4>
                    <span className="text-xs text-black dark:text-white font-extrabold">88% Positive Emotions This Month</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-black py-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-black dark:text-white">{day}</div>
                    ))}
                    {[
                      { emoji: "😌", bg: "bg-pink-100 text-black" },
                      { emoji: "🥰", bg: "bg-pink-200 text-black" },
                      { emoji: "🤩", bg: "bg-pink-300 text-black" },
                      { emoji: "😊", bg: "bg-pink-100 text-black" },
                      { emoji: "😌", bg: "bg-pink-100 text-black" },
                      { emoji: "🥰", bg: "bg-pink-200 text-black" },
                      { emoji: "😌", bg: "bg-pink-100 text-black" }
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
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black dark:text-white">
                      Sealed Future Time Capsule Letters
                    </h4>
                    <span className="text-xs text-black dark:text-white font-extrabold">Automatic Email Notification</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-pink-50 dark:bg-zinc-800 border border-pink-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider">
                        🔒 Sealed Letter to Future Self
                      </span>
                      <span className="text-xs text-black dark:text-white font-bold">Unlocks: Feb 20, 2027</span>
                    </div>
                    <p className="font-serif text-lg font-extrabold text-black dark:text-white">
                      &ldquo;To Me on My 30th Birthday: Are You Still Living Softly?&rdquo;
                    </p>
                    <p className="text-xs text-black dark:text-white italic font-semibold">
                      Sealed with 256-bit encryption. Countdown active: 180 Days remaining.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Overview Section with Cinematic Staggered Cards */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black dark:text-white">
              Everything you need to preserve your life&apos;s story.
            </h2>
            <p className="mt-4 text-black dark:text-white text-lg font-medium">
              Carefully engineered with gentle elegance, deep privacy, and joyful self-reflection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Daily Journal",
                desc: "Rich text formatting, mood tags, location and weather markers, voice clips, and photo attachments in a minimal editor."
              },
              {
                icon: Clock,
                title: "Memory Timeline",
                desc: "Look back on your journey through a visual timeline filtered by years, months, emotional states, and custom tags."
              },
              {
                icon: Smile,
                title: "Mood Tracking",
                desc: "Log daily emotional intensity, discover patterns, view monthly calendars, and gain compassionate mood insights."
              },
              {
                icon: Camera,
                title: "Private Photo Albums",
                desc: "Organize precious moments into curated albums, favorite special shots, and link photos directly to journal entries."
              },
              {
                icon: Mail,
                title: "Future Time Capsules",
                desc: "Write letters to your future self or loved ones with scheduled unlock dates and automated email notifications."
              },
              {
                icon: Sparkles,
                title: "AI Reflection Companion",
                desc: "Get daily writing prompts, summarize memory chapters, and receive gentle emotional reflections when you feel stuck."
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover rounded-3xl p-8 border border-pink-200 space-y-4 bg-white dark:bg-zinc-900"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 text-black flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-serif text-2xl font-extrabold text-black dark:text-white">{feat.title}</h3>
                  <p className="text-black dark:text-white text-sm leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Guarantee Section */}
      <section id="privacy" className="py-20 bg-pink-500 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto text-white">
            Your thoughts belong to you. Always.
          </h2>
          <p className="mt-4 text-white text-lg max-w-2xl mx-auto font-medium">
            We built DearDiary with zero tracking, database encryption, and complete export portability so your heart&apos;s memories stay strictly private.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black dark:text-white">
              Simple, transparent pricing.
            </h2>
            <p className="mt-4 text-black dark:text-white text-lg font-medium">
              Start writing completely free today. Upgrade anytime for unlimited memories & AI reflection tools.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-pink-50 dark:bg-zinc-800 border border-pink-200 text-xs font-bold">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedPlan === "monthly" ? "bg-pink-500 text-white shadow-sm" : "text-black dark:text-white"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  selectedPlan === "yearly" ? "bg-pink-500 text-white shadow-sm" : "text-black dark:text-white"
                }`}
              >
                Yearly Billing <span className="px-2 py-0.5 rounded-full bg-pink-100 text-black text-[10px] font-extrabold">SAVE 30%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card rounded-3xl p-8 border border-pink-200 space-y-6 flex flex-col justify-between bg-white dark:bg-zinc-900">
              <div>
                <span className="px-3 py-1 rounded-full bg-pink-50 dark:bg-zinc-800 text-black dark:text-white text-xs font-extrabold uppercase border border-pink-200">
                  Free Forever
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-black dark:text-white mt-4">$0</h3>
                <p className="text-xs text-black dark:text-white font-bold">Perfect for casual daily journaling.</p>

                <ul className="mt-6 space-y-3 text-sm text-black dark:text-white font-bold">
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Up to 50 Diary Entries
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Memory Timeline & Search
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Basic Mood Tracking
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> 1 Photo Album
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Aesthetic Pink Theme
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl glass-card hover:bg-pink-50 text-center text-black dark:text-white font-extrabold text-sm border border-pink-200 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card rounded-3xl p-8 border-2 border-pink-500 space-y-6 flex flex-col justify-between relative shadow-xl shadow-pink-100 bg-white dark:bg-zinc-900">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-pink-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                Most Popular
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-pink-100 text-black text-xs font-extrabold uppercase">
                  Premium Sanctuary
                </span>
                <div className="flex items-baseline gap-1 mt-4">
                  <h3 className="font-serif text-4xl font-extrabold text-black dark:text-white">
                    {selectedPlan === "yearly" ? "$4.99" : "$6.99"}
                  </h3>
                  <span className="text-xs text-black dark:text-white font-bold">/ month {selectedPlan === "yearly" && "(billed annually)"}</span>
                </div>
                <p className="text-xs text-black dark:text-white font-extrabold">Includes 14-day free trial. Cancel anytime.</p>

                <ul className="mt-6 space-y-3 text-sm text-black dark:text-white font-extrabold">
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Unlimited Diary Entries & Photos
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> AI Prompts, Summarization & Reflections
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Voice Notes Recorder & Audio Storage
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Future Time Capsule Letters & Reminders
                  </li>
                  <li className="flex items-center gap-2 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> All Aesthetic Color Themes
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white text-center font-extrabold text-sm shadow-md shadow-pink-200 transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-white/90 dark:bg-zinc-900/90 border-t border-pink-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-black dark:text-white text-sm font-bold">
              Have questions? We&apos;re here to help you feel safe and confident.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-pink-200 overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-extrabold text-black dark:text-white flex items-center justify-between gap-4"
                >
                  <span className="text-base text-black dark:text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-500 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-black dark:text-white leading-relaxed font-normal border-t border-pink-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Solid Black Text Without Hover Color Shift */}
      <footer className="py-12 border-t border-pink-200 dark:border-zinc-800 text-xs text-black dark:text-white font-bold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="font-serif font-extrabold text-black dark:text-white text-sm">DearDiary</span>
            <span className="text-black dark:text-white">© 2026 DearDiary Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-extrabold">
            <Link href="#privacy" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/admin" className="text-black dark:text-white hover:text-black dark:hover:text-white hover:opacity-75 transition-opacity">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
