"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, FutureLetter } from "@/lib/store";
import {
  Mail,
  Lock,
  Unlock,
  Clock,
  Send,
  Plus,
  Sparkles,
  Calendar,
  User,
  Heart,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FutureLettersPage() {
  const [letters, setLetters] = useState<FutureLetter[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [recipient, setRecipient] = useState<FutureLetter["recipient"]>("Self");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deliverDate, setDeliverDate] = useState(
    new Date(Date.now() + 86400000 * 180).toISOString().split("T")[0]
  );
  const [notifyEmail, setNotifyEmail] = useState("sophia@deardiary.app");
  const [createdSuccess, setCreatedSuccess] = useState(false);

  useEffect(() => {
    setLetters(getStoredData("deardiary_letters", []));
  }, []);

  const handleCreateLetter = () => {
    if (!title.trim() || !content.trim()) return;

    const newLetter: FutureLetter = {
      id: `letter-${Date.now()}`,
      recipient,
      title: title.trim(),
      content: content.trim(),
      deliverDate: new Date(deliverDate).toISOString(),
      isOpened: false,
      notifyEmail: notifyEmail.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updated = [newLetter, ...letters];
    setLetters(updated);
    setStoredData("deardiary_letters", updated);

    setCreatedSuccess(true);
    setTimeout(() => {
      setCreatedSuccess(false);
      setShowCreateModal(false);
      setTitle("");
      setContent("");
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-rose-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Digital Time Capsules
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Letters to Future Self & Family
          </h1>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 hover:opacity-90 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" /> Seal New Future Letter
        </button>
      </div>

      {/* Info Card Banner */}
      <div className="glass-card rounded-3xl p-6 border border-indigo-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-pink-50/40 dark:from-slate-900 dark:to-slate-800 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-500" /> Time Capsule Vault Active
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-light">
            Your letters are sealed with 256-bit encryption. When the unlock date arrives, we will notify you by email.
          </p>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold whitespace-nowrap hidden sm:block">
          {letters.length} Sealed Letters
        </div>
      </div>

      {/* Sealed Letters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {letters.map((letter) => {
          const isUnlockable = new Date(letter.deliverDate).getTime() <= Date.now();
          const daysRemaining = Math.max(
            0,
            Math.ceil((new Date(letter.deliverDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          );

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3 h-3" /> To: {letter.recipient}
                </span>

                <span className={`text-xs font-bold flex items-center gap-1 ${isUnlockable ? "text-emerald-500" : "text-amber-500"}`}>
                  {isUnlockable ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                  {isUnlockable ? "Ready to Open" : `Sealed (${daysRemaining} Days Left)`}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
                {letter.title}
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
                {isUnlockable ? (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-light">{letter.content}</p>
                ) : (
                  <p className="text-xs text-slate-400 italic blur-[2px] select-none">
                    {letter.content.slice(0, 120)}...
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span>Created: {new Date(letter.createdAt).toLocaleDateString()}</span>
                <span>Unlocks: {new Date(letter.deliverDate).toLocaleDateString()}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create Future Letter Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-500" /> Seal Future Time Capsule
                </h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["Self", "Family", "Friend"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecipient(r)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                      recipient === r
                        ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-600 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-800 text-slate-500"
                    }`}
                  >
                    To {r}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Letter Title (e.g. To Me on My 30th Birthday)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold focus:outline-none border border-slate-200 dark:border-slate-700"
              />

              <textarea
                rows={5}
                placeholder="Write your heart out to the future..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none border border-slate-200 dark:border-slate-700 leading-relaxed"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Unlock Date</label>
                  <input
                    type="date"
                    value={deliverDate}
                    onChange={(e) => setDeliverDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-slate-400">Notification Email</label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateLetter}
                className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {createdSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4" />}
                {createdSuccess ? "Letter Sealed in Vault!" : "Seal & Encrypt Letter"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
