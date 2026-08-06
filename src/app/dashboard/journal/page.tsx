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
  CheckCircle2,
  Plus
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

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodOptions: { id: DiaryEntry["mood"]; emoji: string; label: string; bg: string }[] = [
    { id: "Happy", emoji: "😊", label: "Happy", bg: "hover:bg-pink-100" },
    { id: "Calm", emoji: "😌", label: "Calm", bg: "hover:bg-pink-100" },
    { id: "Loved", emoji: "🥰", label: "Loved", bg: "hover:bg-pink-100" },
    { id: "Excited", emoji: "🤩", label: "Excited", bg: "hover:bg-pink-100" },
    { id: "Sad", emoji: "😔", label: "Sad", bg: "hover:bg-pink-100" },
    { id: "Anxious", emoji: "😰", label: "Anxious", bg: "hover:bg-pink-100" },
    { id: "Angry", emoji: "😡", label: "Angry", bg: "hover:bg-pink-100" }
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

  const formatText = (command: string) => {
    if (command === "bold") setContent((prev) => prev + "<b>bold text</b>");
    if (command === "italic") setContent((prev) => prev + "<i>italic text</i>");
    if (command === "h1") setContent((prev) => prev + "<h3>Section Heading</h3>");
    if (command === "quote") setContent((prev) => prev + "<blockquote>A peaceful thought...</blockquote>");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-black">
      {/* Editor Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-pink-200">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider">
            Daily Journal • {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Write New Memory
          </h1>
        </div>

        <button
          onClick={handleSaveEntry}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-sm shadow-md shadow-pink-200 border border-pink-300 flex items-center justify-center gap-2 transition-all hover:scale-105 btn-shimmer"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" /> Memory Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-black" /> Save Memory
            </>
          )}
        </button>
      </div>

      {/* Main Form Fields */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 space-y-6 bg-white">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Give this moment a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl sm:text-3xl font-serif font-extrabold bg-transparent border-b border-pink-200 pb-3 focus:outline-none focus:border-pink-400 placeholder-zinc-400 text-black"
        />

        {/* Mood Selector Grid */}
        <div className="space-y-3">
          <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-pink-500" /> How are you feeling right now?
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {moodOptions.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                  mood === m.id
                    ? "border-pink-400 bg-pink-100 font-extrabold shadow-sm"
                    : "border-pink-200 bg-white hover:bg-pink-50"
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className="text-xs text-black font-extrabold">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Intensity Slider */}
          <div className="pt-2 flex items-center gap-4">
            <span className="text-xs text-black font-bold">Emotion Intensity:</span>
            <input
              type="range"
              min="1"
              max="10"
              value={moodRating}
              onChange={(e) => setMoodRating(Number(e.target.value))}
              className="flex-1 accent-pink-500 cursor-pointer"
            />
            <span className="text-xs font-extrabold text-black">{moodRating}/10</span>
          </div>
        </div>

        {/* Location & Weather Taggers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-pink-500" /> Location
            </label>
            <input
              type="text"
              placeholder="e.g. Kyoto Home Sanctuary"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-xs focus:outline-none focus:border-pink-400 font-bold text-black"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Weather
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50 border border-pink-200 text-xs focus:outline-none focus:border-pink-400 font-bold text-black"
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
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-pink-50 border border-pink-200 flex-wrap">
            <button type="button" onClick={() => formatText("bold")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black">
              <Bold className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("italic")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black">
              <Italic className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("h1")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black">
              <Heading1 className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("quote")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black">
              <Quote className="w-4 h-4 text-black" />
            </button>

            <div className="w-px h-5 bg-pink-200 mx-1" />

            <button
              type="button"
              onClick={handleToggleRecord}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
                isRecording ? "bg-red-200 text-black animate-pulse" : "bg-pink-200 text-black hover:bg-pink-300"
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-black" />
              {isRecording ? "Recording (0:03)..." : recordedAudio ? "Audio Attached ✓" : "Record Voice Clip"}
            </button>
          </div>

          {/* Textarea */}
          <textarea
            rows={8}
            placeholder="Write your heart out... Describe thoughts, feelings, sights, and sounds."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#FFF5F7] border border-pink-200 focus:outline-none focus:border-pink-400 font-sans text-sm text-black placeholder-zinc-400 font-normal leading-relaxed"
          />
        </div>

        {/* Tags & Photos Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-pink-200">
          {/* Tags */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-pink-500" /> Custom Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag (e.g. Mindfulness)..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-3.5 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs focus:outline-none font-bold text-black"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3.5 py-2 rounded-xl bg-pink-200 hover:bg-pink-300 text-black font-extrabold text-xs"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-pink-100 text-black text-xs font-extrabold flex items-center gap-1.5 border border-pink-200"
                >
                  #{t}
                  <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-600">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Photo Attachments */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-pink-500" /> Photo Attachments
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Image URL (e.g. https://...)..."
                value={photoUrlInput}
                onChange={(e) => setPhotoUrlInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs focus:outline-none font-bold text-black"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-3.5 py-2 rounded-xl bg-pink-200 hover:bg-pink-300 text-black font-extrabold text-xs"
              >
                Attach
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pt-1">
              {photos.map((p, idx) => (
                <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-pink-200">
                  <img src={p} alt="attached" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
