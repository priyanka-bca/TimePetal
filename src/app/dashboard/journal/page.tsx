"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredData, setStoredData, DiaryEntry } from "@/lib/store";
import {
  Heart,
  Save,
  Smile,
  Sun,
  CloudRain,
  Cloud,
  Snowflake,
  Wind,
  MapPin,
  Tag,
  Mic,
  Square,
  Volume2,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Sparkles,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

export default function JournalEditorPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<DiaryEntry["mood"]>("Calm");
  const [moodRating, setMoodRating] = useState<number>(8);
  const [location, setLocation] = useState("Home Sanctuary");
  const [weather, setWeather] = useState("Sunny ☀️");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Mindfulness", "Gratitude"]);
  const [photos, setPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  ]);
  const [photoUrlInput, setPhotoUrlInput] = useState("");

  // Voice recorder simulator state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodOptions: { id: DiaryEntry["mood"]; emoji: string; label: string; bg: string }[] = [
    { id: "Happy", emoji: "😊", label: "Happy", bg: "hover:bg-amber-100" },
    { id: "Calm", emoji: "😌", label: "Calm", bg: "hover:bg-emerald-100" },
    { id: "Loved", emoji: "🥰", label: "Loved", bg: "hover:bg-rose-100" },
    { id: "Excited", emoji: "🤩", label: "Excited", bg: "hover:bg-pink-100" },
    { id: "Sad", emoji: "😔", label: "Sad", bg: "hover:bg-blue-100" },
    { id: "Anxious", emoji: "😰", label: "Anxious", bg: "hover:bg-purple-100" },
    { id: "Angry", emoji: "😡", label: "Angry", bg: "hover:bg-red-100" }
  ];

  const weatherOptions = ["Sunny ☀️", "Rainy 🌧️", "Cloudy ⛅", "Snowy ❄️", "Windy 🌬️"];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddPhoto = () => {
    if (photoUrlInput.trim()) {
      setPhotos([...photos, photoUrlInput.trim()]);
      setPhotoUrlInput("");
    }
  };

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedAudio("mock_voice_note_1.mp3");
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const handleSaveEntry = () => {
    if (!title.trim()) {
      alert("Please enter a title for your memory.");
      return;
    }

    const existingEntries = getStoredData<DiaryEntry[]>("deardiary_entries", []);
    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      title: title.trim(),
      content: content.trim() || "<p>Today was a quiet, meaningful day.</p>",
      date: new Date().toISOString(),
      mood,
      moodRating,
      location,
      weather,
      tags,
      voiceNoteUrl: recordedAudio || undefined,
      isFavorite: false,
      photos,
      createdAt: new Date().toISOString()
    };

    setStoredData("deardiary_entries", [newEntry, ...existingEntries]);
    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/timeline");
    }, 1200);
  };

  // Rich Text helper format insert
  const formatText = (command: string, value?: string) => {
    if (command === "bold") setContent((prev) => prev + "<b>bold text</b>");
    if (command === "italic") setContent((prev) => prev + "<i>italic text</i>");
    if (command === "h1") setContent((prev) => prev + "<h3>Section Heading</h3>");
    if (command === "quote") setContent((prev) => prev + "<blockquote>A peaceful thought...</blockquote>");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-rose-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
            Daily Journal • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Write New Memory
          </h1>
        </div>

        <button
          onClick={handleSaveEntry}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-md shadow-rose-200 dark:shadow-none flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Memory Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Memory
            </>
          )}
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Give this moment a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl sm:text-3xl font-serif font-bold bg-transparent border-b border-slate-200 dark:border-slate-800 pb-3 focus:outline-none focus:border-rose-400 placeholder-slate-300 dark:placeholder-slate-600 text-slate-900 dark:text-white"
        />

        {/* Mood Selector Grid */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-rose-500" /> How are you feeling right now?
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {moodOptions.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  mood === m.id
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-950/60 font-bold shadow-sm"
                    : "border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs text-slate-700 dark:text-slate-300">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Intensity Slider */}
          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs text-slate-500">Emotion Intensity:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={moodRating}
              onChange={(e) => setMoodRating(Number(e.target.value))}
              className="flex-1 accent-rose-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-rose-500">{moodRating}/10</span>
          </div>
        </div>

        {/* Location & Weather Taggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Location
            </label>
            <input
              type="text"
              placeholder="e.g. Kyoto Home Sanctuary"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-rose-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> Weather
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-rose-400"
            >
              {weatherOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rich Text Editor Toolbar */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-wrap">
            <button
              type="button"
              onClick={() => formatText("bold")}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText("italic")}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText("h1")}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              title="Heading"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText("quote")}
              className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>

            <span className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            <div className="flex items-center gap-1 text-xs">
              {["✨ Grateful", "🌸 Soft Living", "🌿 Peace"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setContent((prev) => prev + ` ${emoji} `)}
                  className="px-2 py-1 rounded hover:bg-white dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={10}
            placeholder="Express your thoughts freely here... What brought you joy today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-rose-400 text-sm leading-relaxed text-slate-800 dark:text-slate-100 font-light resize-none"
          />
        </div>

        {/* Voice Note Recorder Simulator */}
        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleRecord}
              className={`p-3 rounded-xl transition-all ${
                isRecording
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isRecording ? "Recording voice note..." : recordedAudio ? "Voice Note Attached (0:42)" : "Voice Reflection Clip"}
              </p>
              <p className="text-[10px] text-slate-500">
                {isRecording ? "Listening to your voice..." : "Click to record an audio memory"}
              </p>
            </div>
          </div>

          {recordedAudio && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> Audio Ready
            </span>
          )}
        </div>

        {/* Photo Attachment Section */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-pink-400" /> Photo Attachments
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Image URL..."
              value={photoUrlInput}
              onChange={(e) => setPhotoUrlInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddPhoto}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300"
            >
              Add Photo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {photos.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                <img src={url} alt="Attached" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tag Management */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-4 h-4 text-indigo-400" /> Memory Tags
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Travel, Family, Milestone..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
            >
              + Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5"
              >
                #{t}
                <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-rose-800">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
