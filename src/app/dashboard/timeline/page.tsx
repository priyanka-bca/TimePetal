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

  const allTags = Array.from(new Set(entries.flatMap((e) => e.tags)));

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
    <div className="space-y-8 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-pink-500" /> Chronological Memory Vault
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Memory Timeline
          </h1>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-black absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search timeline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-pink-200 text-xs focus:outline-none focus:border-pink-400 font-bold text-black"
          />
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card rounded-2xl p-4 border border-pink-200 flex flex-wrap items-center justify-between gap-3 text-xs bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-extrabold text-black uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-pink-500" /> Filter By:
          </span>

          {/* Mood Filter */}
          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-pink-50 border border-pink-200 font-extrabold text-black focus:outline-none"
          >
            <option value="ALL">All Moods</option>
            <option value="Happy">😊 Happy</option>
            <option value="Calm">😌 Calm</option>
            <option value="Loved">🥰 Loved</option>
            <option value="Excited">🤩 Excited</option>
            <option value="Sad">😔 Sad</option>
            <option value="Anxious">😰 Anxious</option>
            <option value="Angry">😡 Angry</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-pink-50 border border-pink-200 font-extrabold text-black focus:outline-none"
          >
            <option value="ALL">All Tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </div>

        {/* Favorite Toggle */}
        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`px-3 py-1.5 rounded-lg font-extrabold flex items-center gap-1.5 border transition-all ${
            onlyFavorites
              ? "bg-amber-100 border-amber-300 text-black"
              : "bg-pink-50 border-pink-200 text-black hover:bg-pink-100"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${onlyFavorites ? "text-amber-500 fill-amber-500" : "text-black"}`} />
          Favorites Only ({entries.filter((e) => e.isFavorite).length})
        </button>
      </div>

      {/* Timeline Stream */}
      {filteredEntries.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3 border border-pink-200 bg-white">
          <Sparkles className="w-8 h-8 text-pink-500 mx-auto" />
          <h3 className="font-serif text-xl font-extrabold text-black">No matching memories found</h3>
          <p className="text-xs text-black font-semibold">Try adjusting your filters or write a new journal entry!</p>
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-pink-200 space-y-8">
          {filteredEntries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative"
            >
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[31px] top-6 w-4 h-4 rounded-full bg-pink-400 border-2 border-white shadow-sm" />

              {/* Entry Card */}
              <div className="glass-card glass-card-hover rounded-3xl p-6 border border-pink-200 space-y-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-pink-100">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-pink-100 text-black text-xs font-extrabold border border-pink-200">
                      {entry.mood} ({entry.moodRating}/10)
                    </span>
                    {entry.weather && (
                      <span className="text-xs text-black font-extrabold flex items-center gap-1">
                        {entry.weather}
                      </span>
                    )}
                    {entry.location && (
                      <span className="text-xs text-black font-extrabold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-pink-500" /> {entry.location}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-black font-extrabold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-pink-500" />
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>

                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className="p-1.5 rounded-lg hover:bg-pink-50 text-black transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          entry.isFavorite ? "text-amber-500 fill-amber-500" : "text-black"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-extrabold text-black">
                  {entry.title}
                </h3>

                <div
                  className="text-black text-sm leading-relaxed font-normal"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />

                {/* Photos Preview */}
                {entry.photos.length > 0 && (
                  <div className="flex gap-2 pt-2 overflow-x-auto">
                    {entry.photos.map((url, pIdx) => (
                      <div key={pIdx} className="w-20 h-20 rounded-xl overflow-hidden border border-pink-200 flex-shrink-0">
                        <img src={url} alt="memory" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Tags & Attachments */}
                <div className="pt-3 flex items-center justify-between border-t border-pink-100 text-xs text-black">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {entry.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded bg-pink-50 text-black text-[11px] font-extrabold border border-pink-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
