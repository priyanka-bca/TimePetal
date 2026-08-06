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
  Clock,
  Flower2,
  Sprout,
  Sun
} from "lucide-react";

export default function LandingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<"journal" | "timeline" | "mood" | "letters" | "garden">("garden");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const faqs = [
    {
      q: "Is my personal diary data completely private and secure?",
      a: "Yes. Your privacy is our sacred core principle. All entries, photo uploads, and future letters are encrypted at rest with industry-standard AES-256 and transmitted over TLS 1.3. We never sell your data or train public AI models on your private memories."
    },
    {
      q: "How do Garden Letters & Time Capsules work?",
      a: "Inspired by digital flower gardens, you can write letters to your future self or loved ones, decorate them with flower stamps (🌸 Cherry Blossom, 🌷 Tulip, 🌹 Rose), and set an unlock date or post them to your private garden."
    },
    {
      q: "Can I use DearDiary offline or export my entries?",
      a: "Absolutely! You can export your entire diary, mood logs, photo albums, and flower letters into clean JSON or formatted PDF files at any time with a single click in your account settings."
    },
    {
      q: "Is the AI Assistant optional?",
      a: "Yes. The AI reflection assistant is 100% optional and only runs when you explicitly click for journaling prompts, memory summaries, or daily quotes."
    }
  ];

  return (
    <div className="min-h-screen text-black bg-transparent selection:bg-pink-200 selection:text-black transition-colors overflow-hidden">
      <Navbar />

      {/* Hero Section with Soft & Pastel Pink Glows */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Soft pastel pink ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-pink-200/70 via-rose-100/60 to-pink-100/50 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />

        {/* Floating 3D Pastel Petal & Icon Accents */}
        <motion.div
          animate={{ y: [0, -22, 0], rotate: [0, 15, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] pointer-events-none opacity-70 text-pink-400 text-4xl drop-shadow-md"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -16, 12, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 right-[8%] pointer-events-none opacity-65 text-pink-300 text-5xl drop-shadow-md"
        >
          🌷
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 left-[5%] pointer-events-none opacity-50 text-amber-300 text-3xl drop-shadow-sm"
        >
          ✨
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge with Smooth Pulse & Spin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5F0] border border-[#EFE6D8] shadow-sm mb-8"
          >
            <Flower2 className="w-4 h-4 text-pink-500 fill-pink-500/20 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-extrabold text-black">
              Introducing GardenLetters • Flower-Decorated Private Sanctuary
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black max-w-4xl mx-auto leading-[1.15]"
          >
            Plant your private memories in a{" "}
            <span className="gradient-text italic font-serif text-black">digital flower garden.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-black max-w-2xl mx-auto font-semibold leading-relaxed"
          >
            Write heartfelt letters decorated with blooming flowers, seal time capsules for your future self, record voice clips, and tend to your private emotional garden.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-base shadow-xl shadow-pink-200 border border-pink-300 transition-all flex items-center justify-center gap-2 group btn-shimmer"
              >
                <span className="text-black">Plant Your First Letter 🌸</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="#interactive-demo"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FAF5F0] hover:bg-pink-50 text-black font-bold text-base border border-[#EFE6D8] transition-all flex items-center justify-center gap-2 shadow-sm btn-shimmer"
              >
                <Flower2 className="w-4 h-4 text-pink-500" />
                <span className="text-black">Explore Garden Demo</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-black"
          >
            <span className="flex items-center gap-1.5 text-black">
              <Lock className="w-4 h-4 text-pink-500" /> 256-Bit Encrypted Vault
            </span>
            <span className="flex items-center gap-1.5 text-black">
              <Sprout className="w-4 h-4 text-pink-500" /> Flower-Decorated Letters
            </span>
            <span className="flex items-center gap-1.5 text-black">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 12,000+ Gardeners
            </span>
          </motion.div>

          {/* Floating Warm Beige UI Hero Showcase Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative max-w-5xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-4 sm:p-8 shadow-2xl border border-[#EFE6D8] relative bg-[#FAF5F0] backdrop-blur-xl">
              {/* Fake Browser Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-[#EFE6D8] mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-300" />
                  <div className="w-3 h-3 rounded-full bg-amber-200" />
                  <div className="w-3 h-3 rounded-full bg-rose-200" />
                </div>
                <div className="px-4 py-1 rounded-full bg-[#F5EFE6] text-[11px] font-extrabold text-black flex items-center gap-1.5 border border-[#EFE6D8]">
                  <Lock className="w-3 h-3 text-pink-500" /> deardiary.app/dashboard/letters
                </div>
                <div className="text-xs font-extrabold text-pink-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" /> Garden Blooming
                </div>
              </div>

              {/* Mock Dashboard Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Left Card: Entry Summary */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-black text-xs font-extrabold flex items-center gap-1 border border-[#EFE6D8]">
                      🌸 Cherry Blossom Stamp • Sealed Time Capsule
                    </span>
                    <span className="text-xs text-black font-extrabold">Unlocks: August 6, 2027</span>
                  </div>

                  <h3 className="font-serif text-2xl font-extrabold text-black flex items-center gap-2">
                    To Me on My 30th Birthday 🌹
                  </h3>

                  <p className="text-black text-sm leading-relaxed font-normal">
                    &ldquo;Dear Future Self, I hope you are still living softly, drinking matcha under warm rain, and nurturing your heart&apos;s digital flower garden. Remember how proud I am of you right now...&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#F5EFE6] text-black text-xs font-extrabold border border-[#EFE6D8]">
                      #GardenLetters
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F5EFE6] text-black text-xs font-extrabold border border-[#EFE6D8]">
                      #TimeCapsule
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-black bg-[#F5EFE6] text-xs font-extrabold flex items-center gap-1 border border-[#EFE6D8]">
                      <Flower2 className="w-3.5 h-3.5 text-pink-500" /> Planted in Private Garden
                    </span>
                  </div>
                </div>

                {/* Right Card: Quick Stats Widget */}
                <div className="glass-card rounded-2xl p-5 border border-[#EFE6D8] space-y-4 flex flex-col justify-between bg-[#FAF5F0]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-black font-extrabold">
                      <span>Garden Letters</span>
                      <span className="font-extrabold text-pink-600">🌸 24 Planted</span>
                    </div>
                    <div className="w-full bg-[#F5EFE6] h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "90%" }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="bg-gradient-to-r from-pink-400 to-rose-400 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-1">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600">Flower Wax Seal</p>
                    <p className="text-xs text-black italic font-bold">
                      &ldquo;Every letter is decorated with custom flower stamps and locked with 256-bit AES encryption.&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-black font-bold">Garden Blooms</span>
                    <span className="font-extrabold text-black">100% Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="interactive-demo" className="py-20 bg-transparent border-y border-[#EFE6D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
              A whimsical digital garden for your heartfelt notes.
            </h2>
            <p className="mt-4 text-black text-base font-semibold">
              Try out the Garden Letters module and decorate your notes with blooming flowers right here.
            </p>

            {/* Tab Selectors */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#FAF5F0] gap-1 border border-[#EFE6D8] flex-wrap justify-center">
              <button
                onClick={() => setActivePreviewTab("garden")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "garden"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black"
                }`}
              >
                <Flower2 className="w-4 h-4 text-black" /> Garden Letters 🌸
              </button>
              <button
                onClick={() => setActivePreviewTab("journal")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "journal"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black"
                }`}
              >
                <FileText className="w-4 h-4 text-black" /> Daily Journal
              </button>
              <button
                onClick={() => setActivePreviewTab("timeline")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "timeline"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black"
                }`}
              >
                <Clock className="w-4 h-4 text-black" /> Memory Timeline
              </button>
              <button
                onClick={() => setActivePreviewTab("mood")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "mood"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black"
                }`}
              >
                <Smile className="w-4 h-4 text-black" /> Mood Analytics
              </button>
              <button
                onClick={() => setActivePreviewTab("letters")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                  activePreviewTab === "letters"
                    ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm"
                    : "text-black"
                }`}
              >
                <Mail className="w-4 h-4 text-black" /> Time Capsules
              </button>
            </div>
          </motion.div>

          {/* Active Tab Preview Display */}
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-[#EFE6D8] bg-[#FAF5F0]">
            <AnimatePresence mode="wait">
              {activePreviewTab === "garden" && (
                <motion.div
                  key="garden"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-extrabold text-black flex items-center gap-2">
                        Digital Flower Garden Showcase 🌸
                      </h4>
                      <p className="text-xs text-black font-semibold">Post public or private letters decorated with blooming flower seals.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-xs font-extrabold text-pink-600 border border-[#EFE6D8]">
                      Inspired by GardenLetters 🌷
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Flower Letter Card 1 */}
                    <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">🌸</span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FAF5F0] text-black border border-[#EFE6D8]">
                          Cherry Blossom Seal
                        </span>
                      </div>
                      <h5 className="font-serif text-lg font-extrabold text-black">
                        May your days be soft like spring rain.
                      </h5>
                      <p className="text-xs text-black leading-relaxed font-normal">
                        Planted in the quiet garden. &ldquo;Growth takes time. Be gentle with your heart as you bloom.&rdquo;
                      </p>
                    </div>

                    {/* Flower Letter Card 2 */}
                    <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">🌷</span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FAF5F0] text-black border border-[#EFE6D8]">
                          Tulip Wax Seal
                        </span>
                      </div>
                      <h5 className="font-serif text-lg font-extrabold text-black">
                        To the one reading this from afar 💌
                      </h5>
                      <p className="text-xs text-black leading-relaxed font-normal">
                        &ldquo;You are worthy of rest, warmth, and quiet joy today. Sending love across the garden.&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePreviewTab === "journal" && (
                <motion.div
                  key="journal"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-4">
                    <div>
                      <h4 className="font-serif text-xl font-extrabold text-black">
                        Rich Text Journal Editor
                      </h4>
                      <p className="text-xs text-black font-semibold">Format text, attach voice clips, assign weather & location tags.</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-black text-xs font-extrabold flex items-center gap-1 border border-[#EFE6D8] btn-shimmer">
                        <Mic className="w-3.5 h-3.5 text-pink-600" /> Record Audio
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-black text-xs font-extrabold flex items-center gap-1 border border-[#EFE6D8] btn-shimmer">
                        <Camera className="w-3.5 h-3.5 text-black" /> Add Photos
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-3 font-serif text-black">
                    <p className="text-lg font-extrabold text-black">Title: Walking through the Kyoto bamboo forest</p>
                    <p className="text-sm font-sans leading-relaxed text-black font-normal">
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
                  <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black">
                      Memory Timeline & Filters
                    </h4>
                    <span className="text-xs font-extrabold text-black">Filter by Year • Mood • Tag</span>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF5F0] text-black flex items-center justify-center font-extrabold text-xs border border-[#EFE6D8]">
                          AUG 06
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-black">Matcha Morning & Warm Rain</p>
                          <p className="text-xs text-black font-semibold">Calm • #Mindfulness • Kyoto</p>
                        </div>
                      </div>
                      <span className="text-xs text-amber-500 font-extrabold">★ Favorite</span>
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
                  <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black">
                      Emotional Trends & Mood Calendar
                    </h4>
                    <span className="text-xs text-black font-extrabold">88% Positive Emotions This Month</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-black py-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-black">{day}</div>
                    ))}
                    {[
                      { emoji: "😌", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "🥰", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "🤩", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "😊", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "😌", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "🥰", bg: "bg-[#F5EFE6] text-black" },
                      { emoji: "😌", bg: "bg-[#F5EFE6] text-black" }
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
                  <div className="flex items-center justify-between border-b border-[#EFE6D8] pb-3">
                    <h4 className="font-serif text-xl font-extrabold text-black">
                      Sealed Future Time Capsule Letters
                    </h4>
                    <span className="text-xs text-black font-extrabold">Automatic Email Notification</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-black uppercase tracking-wider">
                        🔒 Sealed Letter to Future Self
                      </span>
                      <span className="text-xs text-black font-extrabold">Unlocks: Feb 20, 2027</span>
                    </div>
                    <p className="font-serif text-lg font-extrabold text-black">
                      &ldquo;To Me on My 30th Birthday: Are You Still Living Softly?&rdquo;
                    </p>
                    <p className="text-xs text-black italic font-bold">
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
              Everything you need to preserve your life&apos;s story.
            </h2>
            <p className="mt-4 text-black text-lg font-semibold">
              Carefully engineered with gentle elegance, flower-decorated letters, deep privacy, and joyful self-reflection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Flower2,
                title: "Garden Letters & Stamps 🌸",
                desc: "Post public or private letters decorated with flower stamps (Cherry Blossom, Tulip, Rose) in your digital garden."
              },
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
                  className="glass-card glass-card-hover rounded-3xl p-8 border border-[#EFE6D8] space-y-4 bg-[#FAF5F0]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-black flex items-center justify-center border border-[#EFE6D8]">
                    <Icon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="font-serif text-2xl font-extrabold text-black">{feat.title}</h3>
                  <p className="text-black text-sm leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Guarantee Section - Dreamy Soft & Pastel Pink Combo Banner */}
      <section id="privacy" className="py-20 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border-y border-pink-300 text-black relative overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF5F0] backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-pink-300 shadow-sm">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto text-black">
            Your thoughts belong to you. Always.
          </h2>
          <p className="mt-4 text-black text-lg max-w-2xl mx-auto font-extrabold">
            We built DearDiary with zero tracking, database encryption, and complete export portability so your heart&apos;s memories stay strictly private.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
              Simple, transparent pricing.
            </h2>
            <p className="mt-4 text-black text-lg font-semibold">
              Start writing completely free today. Upgrade anytime for unlimited memories & AI reflection tools.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-[#FAF5F0] border border-[#EFE6D8] text-xs font-extrabold">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedPlan === "monthly" ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm font-extrabold" : "text-black"
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  selectedPlan === "yearly" ? "bg-gradient-to-r from-pink-400 to-rose-400 text-black shadow-sm font-extrabold" : "text-black"
                }`}
              >
                Yearly Billing <span className="px-2 py-0.5 rounded-full bg-[#F5EFE6] text-black text-[10px] font-extrabold border border-[#EFE6D8]">SAVE 30%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="glass-card rounded-3xl p-8 border border-[#EFE6D8] space-y-6 flex flex-col justify-between bg-[#FAF5F0]">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-black text-xs font-extrabold uppercase border border-[#EFE6D8]">
                  Free Forever
                </span>
                <h3 className="font-serif text-3xl font-extrabold text-black mt-4">$0</h3>
                <p className="text-xs text-black font-extrabold">Perfect for casual daily journaling & flower letters.</p>

                <ul className="mt-6 space-y-3 text-sm text-black font-extrabold">
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Up to 50 Garden Letters & Entries
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Flower Stamps & Wax Seals (🌸 🌷 🌹)
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Memory Timeline & Search
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Basic Mood Tracking & Photo Album
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl glass-card hover:bg-pink-50 text-center text-black font-extrabold text-sm border border-[#EFE6D8] transition-colors btn-shimmer"
              >
                Get Started Free
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card rounded-3xl p-8 border-2 border-pink-400 space-y-6 flex flex-col justify-between relative shadow-xl shadow-pink-100 bg-[#FAF5F0]">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-black text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-pink-300">
                Most Popular
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-[#F5EFE6] text-black text-xs font-extrabold uppercase border border-[#EFE6D8]">
                  Premium Sanctuary
                </span>
                <div className="flex items-baseline gap-1 mt-4">
                  <h3 className="font-serif text-4xl font-extrabold text-black">
                    {selectedPlan === "yearly" ? "$4.99" : "$6.99"}
                  </h3>
                  <span className="text-xs text-black font-extrabold">/ month {selectedPlan === "yearly" && "(billed annually)"}</span>
                </div>
                <p className="text-xs text-pink-600 font-extrabold">Includes 14-day free trial. Cancel anytime.</p>

                <ul className="mt-6 space-y-3 text-sm text-black font-extrabold">
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Unlimited Garden Letters & Photo Vault
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> All Flower Stamps & Botanical Wax Seals
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> AI Prompts, Summarization & Reflections
                  </li>
                  <li className="flex items-center gap-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-pink-500" /> Voice Notes Recorder & Future Time Capsules
                  </li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black text-center font-extrabold text-sm shadow-md shadow-pink-200 border border-pink-300 transition-all btn-shimmer"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 bg-transparent border-t border-[#EFE6D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-black text-sm font-extrabold">
              Have questions? We&apos;re here to help you feel safe and confident.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-[#EFE6D8] overflow-hidden bg-[#FAF5F0]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left font-extrabold text-black flex items-center justify-between gap-4"
                >
                  <span className="text-base text-black">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-500 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-black leading-relaxed font-semibold border-t border-[#EFE6D8] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Solid Black Text */}
      <footer className="py-12 border-t border-[#EFE6D8] text-xs text-black font-extrabold bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="font-serif font-extrabold text-black text-sm">DearDiary</span>
            <span className="text-black">© 2026 DearDiary Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-extrabold">
            <Link href="#privacy" className="text-black hover:opacity-75 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-black hover:opacity-75 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/admin" className="text-black hover:opacity-75 transition-opacity">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
