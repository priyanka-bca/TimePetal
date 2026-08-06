"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, FutureLetter } from "@/lib/store";
import { Mail, Lock, Plus, Calendar, CheckCircle2 } from "lucide-react";

export default function LettersPage() {
  const [letters, setLetters] = useState<FutureLetter[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [unlockDate, setUnlockDate] = useState("2027-08-06");
  const [recipientEmail, setRecipientEmail] = useState("sophia@deardiary.app");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setLetters(getStoredData("deardiary_letters", []));
  }, []);

  const handleCreateLetter = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please write a title and content for your letter.");
      return;
    }

    const newLetter: FutureLetter = {
      id: `letter-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      deliverDate: unlockDate,
      isSealed: true,
      recipientEmail,
      createdAt: new Date().toISOString()
    };

    const updated = [newLetter, ...letters];
    setLetters(updated);
    setStoredData("deardiary_letters", updated);

    setTitle("");
    setContent("");
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  return (
    <div className="space-y-8 text-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-pink-500" /> Digital Time Capsules
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Sealed Future Letters
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Write Letter Form */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-5 bg-white">
          <h2 className="font-serif text-2xl font-extrabold text-black flex items-center gap-2">
            <Lock className="w-5 h-5 text-pink-500" /> Seal a Letter to Future Self
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Letter Title (e.g. To Me on My 30th Birthday)..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-pink-50 border border-pink-200 text-sm font-extrabold text-black focus:outline-none focus:border-pink-400 placeholder-zinc-400"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                  Unlock Date
                </label>
                <input
                  type="date"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-xs font-extrabold text-black focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-black uppercase tracking-wider block mb-1">
                  Notification Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-xs font-extrabold text-black focus:outline-none"
                />
              </div>
            </div>

            <textarea
              rows={6}
              placeholder="Dear Future Me..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#FFF5F7] border border-pink-200 text-sm text-black focus:outline-none font-normal placeholder-zinc-400 leading-relaxed"
            />

            <button
              onClick={handleCreateLetter}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md border border-pink-300 flex items-center justify-center gap-2 btn-shimmer"
            >
              {successMsg ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" /> Time Capsule Sealed Safely!
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-black" /> Encrypt & Seal Time Capsule
                </>
              )}
            </button>
          </div>
        </div>

        {/* Existing Sealed Capsules */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-extrabold text-black">Active Sealed Time Capsules</h3>

          {letters.map((letter) => (
            <div key={letter.id} className="glass-card rounded-2xl p-5 border border-pink-200 space-y-2 bg-white">
              <div className="flex items-center justify-between text-xs font-extrabold text-black">
                <span className="flex items-center gap-1 text-pink-600">
                  <Lock className="w-3.5 h-3.5" /> Sealed AES-256
                </span>
                <span>Unlocks: {letter.deliverDate}</span>
              </div>
              <h4 className="font-serif text-lg font-extrabold text-black">{letter.title}</h4>
              <p className="text-xs text-black italic font-semibold">
                To: {letter.recipientEmail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
