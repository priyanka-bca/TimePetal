"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { FeatureCardsGrid } from "@/components/feature-cards";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Lock,
  Smile,
  Mail,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Star,
  Clock,
  Palette,
  FileText,
  Volume2
} from "lucide-react";

export default function LandingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<"ai" | "timeline" | "mood" | "letters">("ai");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is my personal diary data completely private and secure?",
      a: "Yes. Your privacy is our sacred core principle. All entries, photo uploads, and future letters are encrypted at rest with industry-standard AES-256 and transmitted over TLS 1.3. We never sell your data or train public AI models on your private memories."
    },
    {
      q: "How do Future Letters work?",
      a: "Future Letters act as digital time capsules. You write a letter to your future self, family, or friends, set an unlock date (e.g. 1 year from now), and TimePetal safely seals it with a countdown. On the deliver date, you receive a gentle email notification and your letter unlocks."
    },
    {
      q: "How does the AI Companion work?",
      a: "The AI reflection assistant provides daily writing prompts, summarizes memory chapters, and offers gentle emotional companionship. It is 100% optional and only runs when you choose to interact with it."
    }
  ];

  return (
    <div className="min-h-screen text-black bg-transparent selection:bg-pink-200 selection:text-black transition-colors overflow-hidden">
      <Navbar />

      {/* Hero Section with Soft & Pastel Pink Glows */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Soft pastel pink ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-pink-200/70 via-rose-100/60 to-pink-100/50 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse-glow" />

        {/* Floating 3D Accents */}
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
          🪻
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 left-[5%] pointer-events-none opacity-50 text-amber-300 text-3xl drop-shadow-sm"
        >
          ✨
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF5F0] border border-[#EFE6D8] shadow-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-pink-500 fill-pink-500/20 animate-spin" style={{ animationDuration: '10s' }} />
            <span className="text-xs font-extrabold text-black">
              TimePetal 2.0 • 4 Core Functional Sanctuary Features
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-black max-w-4xl mx-auto leading-[1.15]"
          >
            Your private space for{" "}
            <span className="gradient-text italic font-serif text-black">memories, thoughts,</span> and emotions.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg sm:text-xl text-black max-w-2xl mx-auto font-semibold leading-relaxed"
          >
            An end-to-end private sanctuary powered by AI reflection, memory timelines, mood analytics, sealed time capsule letters, and premium aesthetic themes.
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
                <span className="text-black">Open Private Vault</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FAF5F0] hover:bg-pink-50 text-black font-bold text-base border border-[#EFE6D8] transition-all flex items-center justify-center gap-2 shadow-sm btn-shimmer"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-black">Explore 4 Features</span>
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
              <ShieldCheck className="w-4 h-4 text-pink-500" /> Zero Ad Trackers
            </span>
            <span className="flex items-center gap-1.5 text-black">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 12,000+ Journalers
            </span>
          </motion.div>
        </div>
      </section>

      {/* Features Grid Section - 4 Core Features Only */}
      <section id="features" className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
              Focusing exclusively on the 4 core features that matter most.
            </h2>
            <p className="mt-4 text-black text-lg font-semibold">
              Every single feature is engineered to be 100% functional, private, and beautifully responsive.
            </p>
          </motion.div>

          <FeatureCardsGrid />
        </div>
      </section>

      {/* Privacy Guarantee Section */}
      <section id="privacy" className="py-20 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border-y border-pink-300 text-black relative overflow-hidden shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-[#FAF5F0] backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-pink-300 shadow-sm">
            <Lock className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold max-w-3xl mx-auto text-black">
            Your thoughts belong to you. Always.
          </h2>
          <p className="mt-4 text-black text-lg max-w-2xl mx-auto font-extrabold">
            We built TimePetal with zero tracking, database encryption, and complete export portability so your heart&apos;s memories stay strictly private.
          </p>
        </div>
      </section>

      {/* Donate to Developer Section (100% Free App) */}
      <section id="donate" className="py-12 bg-gradient-to-b from-transparent via-rose-50/50 dark:via-rose-950/20 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#EFE6D8] bg-[#FAF5F0] text-center space-y-8 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-extrabold uppercase border border-pink-200 inline-flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" /> 100% Free Forever • Zero Ads
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
                Support & Donate to the Developer
              </h2>
              <p className="text-black text-base sm:text-lg font-semibold leading-relaxed">
                TimePetal is completely free with no paywalls or mandatory subscriptions. If this private sanctuary brings calm to your day, consider supporting the solo developer with a small coffee donation to help cover server hosting & maintenance!
              </p>
            </div>

            {/* Donation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { amount: "$3", title: "Buy a Coffee ☕", desc: "Keep the developer energized!" },
                { amount: "$5", title: "Sanctuary Supporter 💖", desc: "Helps cover monthly database costs." },
                { amount: "$10+", title: "Super Sponsor 🚀", desc: "Sponsors new feature development!" },
              ].map((tier, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => alert(`Thank you so much for your generosity & support! ☕✨ (${tier.amount} donation link)`)}
                  className="p-6 rounded-2xl bg-[#F5EFE6] hover:bg-pink-100 border border-[#EFE6D8] text-left space-y-2 transition-all shadow-sm group"
                >
                  <div className="text-2xl font-serif font-extrabold text-pink-600">{tier.amount}</div>
                  <div className="font-bold text-sm text-black group-hover:text-pink-600 transition-colors">{tier.title}</div>
                  <div className="text-xs text-black font-medium">{tier.desc}</div>
                </motion.button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EFE6D8] flex flex-wrap items-center justify-center gap-6 text-xs font-extrabold text-black">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> All 4 Sanctuary Features 100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-pink-500" /> Private Data Security Guaranteed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 bg-transparent border-t border-[#EFE6D8]">
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
                    className={`w-5 h-5 text-pink-500 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""
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

      {/* Footer */}
      <footer className="py-12 border-t border-[#EFE6D8] text-xs text-black font-extrabold bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span className="font-serif font-extrabold text-black text-sm">TimePetal</span>
            <span className="text-black">© 2026 TimePetal Inc. All rights reserved.</span>
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
