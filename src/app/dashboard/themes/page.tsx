"use client";

import { useTheme } from "@/components/theme-provider";
import { Palette, CheckCircle2, Moon, Sun, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemesPage() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();

  const themeList: {
    id: "blush" | "lavender" | "sunset" | "midnight";
    name: string;
    description: string;
    icon: string;
    bgPreview: string;
    borderPreview: string;
    accentPreview: string;
  }[] = [
    {
      id: "blush",
      name: "Soft Blush Pink",
      description: "Gentle cherry blossom aesthetic with soft pastel pink hues.",
      icon: "🌸",
      bgPreview: "bg-pink-100",
      borderPreview: "border-pink-300",
      accentPreview: "bg-pink-400"
    },
    {
      id: "lavender",
      name: "Aesthetic Lavender",
      description: "Soothing floral lavender tones for calm, meditative journaling.",
      icon: "🪻",
      bgPreview: "bg-purple-100",
      borderPreview: "border-purple-300",
      accentPreview: "bg-purple-400"
    },
    {
      id: "sunset",
      name: "Sunset Peach",
      description: "Warm golden peach glow reminiscent of calm coastal sunsets.",
      icon: "🌅",
      bgPreview: "bg-orange-100",
      borderPreview: "border-orange-300",
      accentPreview: "bg-orange-400"
    },
    {
      id: "midnight",
      name: "Rose Mist",
      description: "Elegantly muted rose wine tones with romantic warmth.",
      icon: "🌹",
      bgPreview: "bg-rose-100",
      borderPreview: "border-rose-300",
      accentPreview: "bg-rose-400"
    }
  ];

  return (
    <div className="space-y-8 text-black max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE6D8]">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-pink-500" /> Premium Sanctuary Aesthetics
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            ⭐ Premium Themes & Atmosphere
          </h1>
        </div>

        {/* Day / Night Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2.5 rounded-2xl bg-[#FAF5F0] border border-[#EFE6D8] text-xs font-extrabold text-black shadow-sm flex items-center gap-2 btn-shimmer"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Day Mode Active</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-pink-500 fill-pink-500/20" />
              <span>Night Sky Active</span>
            </>
          )}
        </button>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {themeList.map((t) => {
          const isActive = theme === t.id && !isDarkMode;
          return (
            <motion.div
              key={t.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                if (isDarkMode) toggleDarkMode();
                setTheme(t.id);
              }}
              className={`glass-card rounded-3xl p-6 border transition-all cursor-pointer bg-[#FAF5F0] space-y-4 ${
                isActive ? "border-2 border-pink-500 shadow-lg" : "border-[#EFE6D8]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.icon}</span>
                  <div>
                    <h3 className="font-serif text-xl font-extrabold text-black">{t.name}</h3>
                    <p className="text-xs text-black font-semibold">{t.description}</p>
                  </div>
                </div>
                {isActive && <CheckCircle2 className="w-6 h-6 text-pink-500 flex-shrink-0" />}
              </div>

              {/* Color Palette Preview Swatches */}
              <div className="p-3 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] flex items-center justify-between text-xs font-extrabold">
                <span className="text-black font-bold">Theme Swatch</span>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full ${t.bgPreview} border ${t.borderPreview}`} title="Background" />
                  <span className={`w-5 h-5 rounded-full ${t.accentPreview}`} title="Accent" />
                  <span className="w-5 h-5 rounded-full bg-[#FAF5F0] border border-[#EFE6D8]" title="Card" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cosmic Night Mode Showcase Card */}
      <div
        onClick={() => {
          if (!isDarkMode) toggleDarkMode();
        }}
        className={`glass-card rounded-3xl p-6 border transition-all cursor-pointer bg-[#FAF5F0] space-y-4 ${
          isDarkMode ? "border-2 border-pink-500 shadow-lg" : "border-[#EFE6D8]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌙</span>
            <div>
              <h3 className="font-serif text-xl font-extrabold text-black">Cosmic Night Sky Mode</h3>
              <p className="text-xs text-black font-semibold">Deep night backdrop featuring moving, twinkling stars for late-night journaling.</p>
            </div>
          </div>
          {isDarkMode && <CheckCircle2 className="w-6 h-6 text-pink-500" />}
        </div>
      </div>
    </div>
  );
}
