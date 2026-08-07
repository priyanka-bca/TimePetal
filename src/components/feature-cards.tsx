"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Clock,
  Smile,
  Mail,
  ArrowRight,
  PenTool,
  BookOpen,
  TrendingUp,
  Heart,
  Calendar,
  Lock
} from "lucide-react";

export function FeatureCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <AiCompanionCard />
      <MemoryTimelineCard />
      <MoodAnalyticsCard />
      <FutureLettersCard />
    </div>
  );
}

// Shared Base Card Animation Engine (10px lift, softer shadow, lavender -> blue gradient border, brighter background, cursor-follow glow, 400ms ease-out)
function CardBase({
  children,
  link,
  themeGlow,
  borderColor,
  hoverBg,
  glowColor,
  onHoverChange,
}: {
  children: (isHovered: boolean) => React.ReactNode;
  link: string;
  themeGlow: string;
  borderColor?: string;
  hoverBg?: string;
  glowColor?: string;
  onHoverChange?: (isHovered: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative glass-card rounded-3xl p-7 border transition-all duration-400 bg-[#FAF5F0] hover:bg-white overflow-hidden cursor-pointer group flex flex-col justify-between shadow-sm ${
        isHovered
          ? "shadow-2xl shadow-purple-200/50 border-transparent"
          : "border-[#EFE6D8]"
      }`}
    >
      {/* Gentle Lavender -> Blue Gradient Border Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-[1.5px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-300 via-pink-300 to-sky-300"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Radial Cursor-Follow Light Overlay */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${themeGlow}, transparent 80%)`,
        }}
      />

      {children(isHovered)}

      {/* Footer Link & Gently Sliding "Try Feature Live" Button */}
      <div className="pt-4 border-t border-[#EFE6D8]/60 relative z-10 flex items-center justify-between">
        <Link
          href={link}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-pink-600 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:brightness-125 group-hover:text-pink-700"
        >
          <span>Try Feature Live</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// 1. AI Diary Companion (📖 Notebook opens, ✏️ Pencil writes words, Soft lavender glow)
function AiCompanionCard() {
  const fullText = "Dear Diary, today felt quiet...";
  const [typedText, setTypedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isHovered && typedText.length < fullText.length) {
      timerId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 45);
    } else if (!isHovered && typedText !== "") {
      setTypedText("");
    }
    return () => clearTimeout(timerId);
  }, [isHovered, typedText]);

  return (
    <CardBase
      link="/dashboard/ai"
      themeGlow="rgba(139, 92, 246, 0.14)"
      borderColor="#C4B5FD"
      hoverBg="hover:bg-[#F5F0FB]"
      glowColor="shadow-xl shadow-purple-200/60"
      onHoverChange={setIsHovered}
    >
      {(hovered) => (
        <div className="space-y-4 relative z-10">
            {/* Header Icon with Notebook Opening & Pen Animation */}
            <div className="flex items-center justify-between">
              <div className="w-13 h-13 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center border border-purple-200 group-hover:bg-purple-200/80 transition-colors duration-300 relative overflow-hidden">
                <motion.div
                  animate={isHovered ? { rotateY: -25, scale: 1.1 } : { rotateY: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative origin-left"
                >
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </motion.div>

                {/* Animated Pen Writing Icon */}
                <motion.div
                  animate={isHovered ? { x: [0, 4, 0], y: [0, -2, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute right-2 bottom-2 text-purple-700"
                >
                  <PenTool className="w-3.5 h-3.5" />
                </motion.div>

                {/* AI Sparkles */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: -8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1 right-1"
                    >
                      <Sparkles className="w-3 h-3 text-purple-500 fill-purple-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200">
                AI Companion
              </span>
            </div>

            <h3 className="font-serif text-2xl font-extrabold text-black group-hover:text-purple-700 transition-colors duration-300">
              ⭐ AI Diary Companion
            </h3>

            <p className="text-black text-sm leading-relaxed font-normal transition-transform duration-300 group-hover:-translate-y-0.5">
              Get daily writing prompts, summarize memory chapters, and receive gentle emotional reflections when you feel stuck.
            </p>

            {/* Typewriter Pencil Writing Preview Box */}
            <div className="p-3.5 rounded-2xl bg-white/85 border border-purple-100 shadow-inner space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600">
                <PenTool className="w-3.5 h-3.5" />
                <span>Animated Journal Pencil</span>
              </div>
              <div className="h-6 flex items-center">
                <p className="text-xs text-purple-900 font-serif font-semibold italic">
                  {typedText || "Hover to start writing..."}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </div>
          </div>
        )}
    </CardBase>
  );
}

// 2. Memory Timeline (🕰️ Timeline line draws, milestone dots light up, Calming blue glow)
function MemoryTimelineCard() {
  return (
    <CardBase
      link="/dashboard/timeline"
      themeGlow="rgba(14, 165, 233, 0.14)"
      borderColor="#7DD3FC"
      hoverBg="hover:bg-[#F0F9FF]"
      glowColor="shadow-xl shadow-sky-200/60"
    >
      {(isHovered) => (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center border border-sky-200 group-hover:bg-sky-200/80 transition-colors duration-300">
              <Clock className="w-6 h-6 text-sky-600 transition-transform duration-500 group-hover:rotate-180" />
            </div>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200">
              Memory Line
            </span>
          </div>

          <h3 className="font-serif text-2xl font-extrabold text-black group-hover:text-sky-700 transition-colors duration-300">
            ⭐ Memory Timeline
          </h3>

          <p className="text-black text-sm leading-relaxed font-normal transition-transform duration-300 group-hover:-translate-y-0.5">
            Look back on your journey through a visual timeline filtered by years, months, emotional states, and custom tags.
          </p>

          {/* Interactive Timeline Animation (Line Draws Left to Right + Sequential Dots) */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-sky-100 shadow-inner space-y-3">
            <div className="relative flex items-center justify-between py-1">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-sky-100 -translate-y-1/2" />
              <motion.div
                initial={{ width: "0%" }}
                animate={isHovered ? { width: "100%" } : { width: "30%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-0 h-0.5 bg-sky-400 -translate-y-1/2"
              />

              {/* Milestone Dots Illuminating One by One */}
              {[0, 1, 2, 3].map((dotIdx) => (
                <motion.div
                  key={dotIdx}
                  animate={
                    isHovered
                      ? { scale: [1, 1.4, 1], backgroundColor: "#0284C7", boxShadow: "0 0 8px rgba(2, 132, 199, 0.6)" }
                      : { scale: 1, backgroundColor: dotIdx === 0 ? "#38BDF8" : "#CBD5E1", boxShadow: "none" }
                  }
                  transition={{ duration: 0.3, delay: dotIdx * 0.1 }}
                  className="w-3.5 h-3.5 rounded-full border-2 border-white relative z-10"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-extrabold text-sky-800">
              <span>Aug 04</span>
              <span>Aug 05</span>
              <span>Aug 06 ✨</span>
            </div>
          </div>
        </div>
      )}
    </CardBase>
  );
}

// 3. Mood Analytics (📈 Mood graph animates upward, dots pulse, radial emerald expansion)
function MoodAnalyticsCard() {
  return (
    <CardBase
      link="/dashboard/mood"
      themeGlow="rgba(16, 185, 129, 0.14)"
      borderColor="#6EE7B7"
      hoverBg="hover:bg-[#ECFDF5]"
      glowColor="shadow-xl shadow-emerald-200/60"
    >
      {(isHovered) => (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Radial Gradient Expanding Halo Behind Icon Container */}
            <div className="relative">
              <motion.div
                animate={isHovered ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute -inset-2 rounded-2xl bg-emerald-200/40 blur-md pointer-events-none"
              />
              <div className="w-13 h-13 rounded-2xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center border border-emerald-200 relative z-10">
                <Smile className="w-6 h-6 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Live Insights
            </span>
          </div>

          <h3 className="font-serif text-2xl font-extrabold text-black group-hover:text-emerald-700 transition-colors duration-300">
            ⭐ Mood Analytics
          </h3>

          <p className="text-black text-sm leading-relaxed font-normal transition-transform duration-300 group-hover:-translate-y-0.5">
            Log daily emotional intensity, discover patterns, view monthly calendars, and gain compassionate mood insights.
          </p>

          {/* Upward Line Graph + Pulsing Mood Nodes */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-emerald-100 shadow-inner space-y-2">
            <div className="flex items-end justify-between h-10 gap-1.5 pt-1">
              {[
                { height: "35%", hoverHeight: "65%" },
                { height: "55%", hoverHeight: "80%" },
                { height: "75%", hoverHeight: "95%" },
                { height: "60%", hoverHeight: "75%" },
                { height: "85%", hoverHeight: "100%" }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative">
                  <motion.div
                    animate={isHovered ? { height: bar.hoverHeight } : { height: bar.height }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-emerald-400 to-teal-300 rounded-t-md relative"
                  >
                    {/* Pulsing Colored Dot */}
                    <motion.div
                      animate={isHovered ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: idx * 0.1 }}
                      className="w-2 h-2 rounded-full bg-emerald-600 absolute -top-1 left-1/2 -translate-x-1/2 border border-white shadow-sm"
                    />
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] font-extrabold text-emerald-800 pt-1">
              <span>Emotional Trends</span>
              <span className="text-emerald-600 flex items-center gap-1 font-extrabold">
                <TrendingUp className="w-3 h-3" /> +28% Calm
              </span>
            </div>
          </div>
        </div>
      )}
    </CardBase>
  );
}

// 4. Future Letters (✉️ Flap opens, 🌸 Petals float, 🕯️ Wax seal pulses, ✨ Sparkles appear)
function FutureLettersCard() {
  return (
    <CardBase
      link="/dashboard/letters"
      themeGlow="rgba(236, 72, 153, 0.14)"
      borderColor="#F9A8D4"
      hoverBg="hover:bg-[#FDF2F8]"
      glowColor="shadow-xl shadow-pink-200/60"
    >
      {(isHovered) => (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="w-13 h-13 rounded-2xl bg-pink-100/80 text-pink-600 flex items-center justify-center border border-pink-200 group-hover:bg-pink-200/80 transition-colors duration-300 relative overflow-hidden">
              <motion.div
                animate={isHovered ? { rotateX: -35 } : { rotateX: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="origin-top"
              >
                <Mail className="w-6 h-6 text-pink-600" />
              </motion.div>

              {/* Floating Flower Petals Animation */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 12, x: -5 }}
                      animate={{ opacity: [0, 1, 0], y: -20, x: 8 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="absolute bottom-1 right-2 text-xs"
                    >
                      🌸
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 15, x: 5 }}
                      animate={{ opacity: [0, 1, 0], y: -18, x: -8 }}
                      transition={{ duration: 0.9, delay: 0.2, repeat: Infinity }}
                      className="absolute bottom-1 left-2 text-xs"
                    >
                      🌷
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-600 px-2.5 py-1 rounded-full bg-pink-50 border border-pink-200">
              Future Capsule
            </span>
          </div>

          <h3 className="font-serif text-2xl font-extrabold text-black group-hover:text-pink-700 transition-colors duration-300">
            ⭐ Future Letters
          </h3>

          <p className="text-black text-sm leading-relaxed font-normal transition-transform duration-300 group-hover:-translate-y-0.5">
            Write letters to your future self or loved ones with flower stamps, scheduled unlock dates, and automated email notifications.
          </p>

          {/* Sealed Capsule Preview (Wax Seal Pulsing & Sparkles) */}
          <div className="p-3.5 rounded-2xl bg-white/85 border border-pink-100 shadow-inner space-y-1.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-extrabold text-pink-700">
              <span className="flex items-center gap-1.5">
                <motion.span
                  animate={isHovered ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shadow-sm shadow-pink-300"
                >
                  🔒
                </motion.span>
                Pulsing Wax Seal
              </span>
              <span className="text-[11px] text-pink-500 font-bold">Unlocks Feb 2027</span>
            </div>
            <p className="text-[11px] text-pink-900 italic font-semibold line-clamp-1">
              &ldquo;To Me on My 30th Birthday: Are You Living Softly?&rdquo;
            </p>
          </div>
        </div>
      )}
    </CardBase>
  );
}
