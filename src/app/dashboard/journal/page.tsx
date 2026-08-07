"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredData, setStoredData, DiaryEntry } from "@/lib/store";
import {
  Heart,
  Save,
  Sun,
  MapPin,
  Tag,
  Image as ImageIcon,
  Bold,
  Italic,
  Quote,
  Heading1,
  CheckCircle2,
  Upload,
  X
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function JournalEditorPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<DiaryEntry["mood"]>("Calm");
  const [moodRating, setMoodRating] = useState<number>(8);
  const [location, setLocation] = useState("Home Sanctuary");
  const [weather, setWeather] = useState("Sunny ☀️");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Mindfulness", "Gratitude"]);
  const [photos, setPhotos] = useState<string[]>([]); // Starts clean with no default demo image
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const moodOptions: { id: DiaryEntry["mood"]; emoji: string; label: string }[] = [
    { id: "Happy", emoji: "😊", label: "Happy" },
    { id: "Calm", emoji: "😌", label: "Calm" },
    { id: "Loved", emoji: "🥰", label: "Loved" },
    { id: "Excited", emoji: "🤩", label: "Excited" },
    { id: "Sad", emoji: "😔", label: "Sad" },
    { id: "Anxious", emoji: "😰", label: "Anxious" },
    { id: "Angry", emoji: "😡", label: "Angry" }
  ];

  const weatherOptions = ["Sunny ☀️", "Rainy 🌧️", "Cloudy ⛅", "Snowy ❄️", "Windy 🌬️"];

  // Local Photo File Upload Handler
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  // URL Photo Attachment Handler
  const handleAddPhotoUrl = () => {
    if (photoUrlInput.trim()) {
      setPhotos([...photos, photoUrlInput.trim()]);
      setPhotoUrlInput("");
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Text Formatting Helper
  const formatText = (command: string) => {
    if (command === "bold") setContent((prev) => prev + " **bold text**");
    if (command === "italic") setContent((prev) => prev + " *italic text*");
    if (command === "h1") setContent((prev) => prev + "\n# Memory Heading\n");
    if (command === "quote") setContent((prev) => prev + '\n> "Quiet reflection quote..."\n');
  };

  // Save Entry to Store
  const handleSaveEntry = () => {
    if (!title.trim()) {
      alert("Please enter a title for your memory.");
      return;
    }

    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      date: new Date().toISOString().split("T")[0],
      mood,
      moodRating,
      location,
      weather,
      tags,
      photos,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<DiaryEntry[]>("deardiary_entries", [], user?.id);
    const updated = [newEntry, ...existing];
    setStoredData("deardiary_entries", updated, user?.id);

    setSavedSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/timeline");
    }, 1200);
  };

  return (
    <div className="space-y-8 text-black max-w-4xl mx-auto">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE6D8]">
        <div>
          <span className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> New Sanctuary Memory
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-black mt-1">
            Write Today&apos;s Memory
          </h1>
        </div>

        <button
          onClick={handleSaveEntry}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-black font-extrabold text-xs shadow-md border border-pink-300 flex items-center gap-2 btn-shimmer"
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

      {/* Main Journal Form Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#EFE6D8] space-y-6 bg-[#FAF5F0]">
        {/* Title Input */}
        <div>
          <input
            type="text"
            placeholder="Title your memory (e.g. Quiet Morning with Matcha & Rain)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full font-serif text-2xl sm:text-3xl font-extrabold bg-transparent border-b border-[#EFE6D8] pb-3 focus:outline-none focus:border-pink-400 text-black placeholder-zinc-400"
          />
        </div>

        {/* Mood Selector & Intensity Slider */}
        <div className="space-y-3 p-4 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8]">
          <label className="text-xs font-extrabold text-black uppercase tracking-wider block">
            How are you feeling right now?
          </label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMood(m.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all border ${
                  mood === m.id
                    ? "bg-pink-300 text-black border-pink-400 shadow-sm"
                    : "bg-[#FAF5F0] text-black border-[#EFE6D8] hover:bg-pink-50"
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs focus:outline-none focus:border-pink-400 font-bold text-black"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" /> Weather
            </label>
            <select
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs focus:outline-none focus:border-pink-400 font-bold text-black"
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
          <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] flex-wrap">
            <button type="button" onClick={() => formatText("bold")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black" title="Bold">
              <Bold className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("italic")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black" title="Italic">
              <Italic className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("h1")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black" title="Heading">
              <Heading1 className="w-4 h-4 text-black" />
            </button>
            <button type="button" onClick={() => formatText("quote")} className="p-2 rounded-lg hover:bg-pink-100 font-bold text-black" title="Quote">
              <Quote className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Textarea Content */}
          <textarea
            rows={8}
            placeholder="Write your heart out... Describe thoughts, feelings, sights, and sounds."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#FAF5F0] border border-[#EFE6D8] focus:outline-none focus:border-pink-400 font-sans text-sm text-black placeholder-zinc-400 font-normal leading-relaxed"
          />
        </div>

        {/* PHOTO ATTACHMENT SECTION */}
        <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-pink-500" /> Photo Attachments
            </label>

            {/* Local Photo File Upload Input */}
            <label className="px-3 py-1.5 rounded-xl bg-[#FAF5F0] border border-[#EFE6D8] text-xs font-extrabold text-black cursor-pointer hover:bg-pink-50 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-pink-500" /> Choose Local Photo File
              <input type="file" accept="image/*" onChange={handlePhotoFileUpload} className="hidden" />
            </label>
          </div>

          {/* OR Paste Photo URL Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="OR Paste Image URL (https://...)..."
              value={photoUrlInput}
              onChange={(e) => setPhotoUrlInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF5F0] border border-[#EFE6D8] text-xs focus:outline-none font-bold text-black placeholder-zinc-400"
            />
            <button
              type="button"
              onClick={handleAddPhotoUrl}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-black font-extrabold text-xs border border-pink-300"
            >
              Attach Link
            </button>
          </div>

          {/* Attached Photo Thumbnails */}
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {photos.map((p, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#EFE6D8] group">
                  <img src={p} alt="attached" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Tags Section */}
        <div className="space-y-3 pt-2 border-t border-[#EFE6D8]">
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
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#F5EFE6] border border-[#EFE6D8] text-xs focus:outline-none font-bold text-black"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-black font-extrabold text-xs border border-pink-300"
            >
              Add Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-[#F5EFE6] text-black text-xs font-extrabold flex items-center gap-1.5 border border-[#EFE6D8]"
              >
                #{t}
                <button type="button" onClick={() => handleRemoveTag(t)} className="hover:text-red-600">
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
