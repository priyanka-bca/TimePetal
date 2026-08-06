"use client";

import { useEffect, useState } from "react";
import { getStoredData, setStoredData, DiaryEntry } from "@/lib/store";
import {
  Clock,
  Filter,
  Smile,
  Star,
  Tag,
  MapPin,
  Calendar,
  Volume2,
  Camera,
  Heart,
  Search,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimelinePage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setEntries(getStoredData("deardiary_entries", []));
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = entries.map((e) =>
      e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
    );
    setEntries(updated);
    setStoredData("deardiary_entries", updated);
  };

  // Collect unique tags
  const allTags = Array.from(new Set(entries.flatMap((e) => e.tags)));

  // Filter entries logic
  const filteredEntries = entries.filter((e) => {
    if (onlyFavorites && !e.isFavorite) return false;
    if (selectedMood !== "ALL" && e.mood !== selectedMood) return false;
    if (selectedTag !== "ALL" && !e.tags.includes(selectedTag)) return false;
    if (
      searchTerm.trim() &&
      !e.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !e.content.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-rose-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Chronological Memory Vault
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Memory Timeline
          </h1>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-rose-400"
          />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-rose-500" /> Filter By:
          </span>

          {/* Mood Filter */}
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Moods</option>
            <option value="Happy">😊 Happy</option>
            <option value="Calm">😌 Calm</option>
            <option value="Loved">🥰 Loved</option>
            <option value="Excited">🤩 Excited</option>
            <option value="Sad">😔 Sad</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </div>

        {/* Favorites Only Toggle */}
        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`px-3.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
            onlyFavorites
              ? "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${onlyFavorites ? "fill-amber-500 text-amber-500" : ""}`} />
          Favorites Only
        </button>
      </div>

      {/* Timeline Stream */}
      {filteredEntries.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-rose-300 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100">
            No memories match your filter
          </h3>
          <p className="text-xs text-slate-500">Try clearing filters or search terms.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-rose-200 dark:border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {filteredEntries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Bullet Point */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-4 border-rose-400 shadow-md" />

              {/* Memory Card */}
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-4">
                {/* Top Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 font-bold">
                      {entry.mood} ({entry.moodRating}/10)
                    </span>
                    {entry.weather && (
                      <span className="text-slate-500 font-medium">{entry.weather}</span>
                    )}
                    {entry.location && (
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" /> {entry.location}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className="p-1.5 rounded-full hover:bg-rose-50 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 transition-colors"
                      title="Favorite memory"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          entry.isFavorite ? "fill-amber-400 text-amber-400" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Entry Title & Body */}
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  {entry.title}
                </h2>

                <div
                  className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light space-y-2"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />

                {/* Voice Note Attachment */}
                {entry.voiceNoteUrl && (
                  <div className="p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 flex items-center gap-3 text-xs text-rose-600 dark:text-rose-300">
                    <Volume2 className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold">Attached Voice Clip</span>
                    <span className="text-slate-400">(0:42)</span>
                  </div>
                )}

                {/* Photo Gallery Grid */}
                {entry.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {entry.photos.map((img, pIdx) => (
                      <div
                        key={pIdx}
                        className="relative aspect-video rounded-2xl overflow-hidden group shadow-sm"
                      >
                        <img
                          src={img}
                          alt="Memory Photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags Footer */}
                <div className="pt-2 flex items-center gap-2 text-xs">
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
