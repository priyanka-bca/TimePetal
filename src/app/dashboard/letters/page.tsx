"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, FutureLetter } from "@/lib/store";
import { Mail, Lock, Plus, Calendar, CheckCircle2, Flower2, Sprout } from "lucide-react";

import { useAuth } from "@/lib/auth";

export default function LettersPage() {
  const { user } = useAuth();
  const [letters, setLetters] = useState<FutureLetter[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [unlockDate, setUnlockDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [recipientEmail, setRecipientEmail] = useState(user?.email || "");
  const [selectedFlower, setSelectedFlower] = useState("🌸 Cherry Blossom");
  const [successMsg, setSuccessMsg] = useState(false);

  const flowerStamps = [
    { name: "🌸 Cherry Blossom", emoji: "🌸", bg: "bg-pink-100" },
    { name: "🌷 Spring Tulip", emoji: "🌷", bg: "bg-rose-100" },
    { name: "🌹 Wild Rose", emoji: "🌹", bg: "bg-red-100" },
    { name: "🌼 Golden Daisy", emoji: "🌼", bg: "bg-amber-100" },
    { name: "🪻 Purple Lavender", emoji: "🪻", bg: "bg-purple-100" }
  ];

  useEffect(() => {
    setLetters(getStoredData("deardiary_letters", [], user?.id));
    if (user?.email) {
      setRecipientEmail(user.email);
    }
    setUnlockDate(new Date().toISOString().split("T")[0]);
  }, [user]);

  const handleCreateLetter = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please write a title and content for your letter.");
      return;
    }

    const newLetter: FutureLetter = {
      id: `letter-${Date.now()}`,
      recipient: "Self",
      title: `${selectedFlower.split(" ")[0]} ${title.trim()}`,
      content: content.trim(),
      deliverDate: unlockDate,
      isOpened: false,
      notifyEmail: recipientEmail,
      createdAt: new Date().toISOString()
    };

    const updated = [newLetter, ...letters];
    setLetters(updated);
    setStoredData("deardiary_letters", updated, user?.id);

    setTitle("");
    setContent("");
    setUnlockDate(new Date().toISOString().split("T")[0]);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-8 text-black dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-200 dark:border-purple-900">
        <div>
          <span className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Flower2 className="w-3.5 h-3.5 text-pink-500" /> Digital Garden Letters & Time Capsules
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black dark:text-white mt-1">
            Flower-Decorated Garden Letters
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Write Letter Form */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 dark:border-purple-900 space-y-5 bg-white dark:bg-slate-900">
          <h2 className="font-serif text-2xl font-extrabold text-black dark:text-white flex items-center gap-2">
            <Sprout className="w-5 h-5 text-pink-500" /> Plant a Letter in Your Garden
          </h2>

          <div className="space-y-4">
            {/* Select Flower Stamp */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider block">
                Select Flower Stamp Decoration 🌸
              </label>
              <div className="flex flex-wrap gap-2">
                {flowerStamps.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setSelectedFlower(f.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition-all ${selectedFlower === f.name
                      ? "bg-pink-200 dark:bg-purple-900 border-pink-400 dark:border-purple-600 text-black dark:text-white shadow-sm"
                      : "bg-pink-50 dark:bg-purple-950/40 border-pink-200 dark:border-purple-900 text-black dark:text-white hover:bg-pink-100"
                      }`}
                  >
                    <span className="text-base">{f.emoji}</span>
                    <span>{f.name.split(" ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Letter Title (e.g. To Me on My 30th Birthday)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50 dark:bg-purple-950/60 border border-pink-300 dark:border-purple-700 text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-pink-500 dark:focus:border-purple-500 placeholder-zinc-500 dark:placeholder-purple-300/80 shadow-sm"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider block mb-1">
                  Unlock / Bloom Date
                </label>
                <input
                  type="date"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50 dark:bg-purple-950/60 border border-pink-300 dark:border-purple-700 text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-pink-500 dark:focus:border-purple-500 shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-black dark:text-white uppercase tracking-wider block mb-1">
                  Notification Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50 dark:bg-purple-950/60 border border-pink-300 dark:border-purple-700 text-xs font-extrabold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-pink-500 dark:focus:border-purple-500 placeholder-zinc-500 dark:placeholder-purple-300/80 shadow-sm"
                />
              </div>
            </div>

            <textarea
              rows={6}
              placeholder="Write your heartfelt note... Plant it with love."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-2xl bg-pink-50/70 dark:bg-purple-950/60 border border-pink-300 dark:border-purple-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none font-medium placeholder-zinc-500 dark:placeholder-purple-300/80 leading-relaxed shadow-sm"
            />

            <button
              onClick={handleCreateLetter}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md border border-pink-300 flex items-center justify-center gap-2 btn-shimmer"
            >
              {successMsg ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" /> Flower Letter Planted in Garden!
                </>
              ) : (
                <>
                  <Flower2 className="w-4 h-4 text-black" /> Plant Flower Letter 🌸
                </>
              )}
            </button>
          </div>
        </div>

        {/* Existing Sealed Capsules */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-extrabold text-black dark:text-white">Planted Garden Letters</h3>

          {letters.map((letter) => (
            <div key={letter.id} className="glass-card rounded-2xl p-5 border border-pink-200 dark:border-purple-900 space-y-2 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between text-xs font-extrabold text-black dark:text-white">
                <span className="flex items-center gap-1 text-pink-600 dark:text-pink-300">
                  <Flower2 className="w-3.5 h-3.5" /> Flower Sealed
                </span>
                <span>Blooms: {letter.deliverDate}</span>
              </div>
              <h4 className="font-serif text-lg font-extrabold text-black dark:text-white">{letter.title}</h4>
              <p className="text-xs text-black dark:text-zinc-300 italic font-semibold">
                To: {letter.notifyEmail || "Self"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
