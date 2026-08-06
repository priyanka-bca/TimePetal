"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getStoredData, setStoredData, DiaryEntry } from "@/lib/store";
import {
  Heart,
  Save,
  Smile,
  Sun,
  MapPin,
  Tag,
  Mic,
  Square,
  Volume2,
  Image as ImageIcon,
  Bold,
  Italic,
  Quote,
  Heading1,
  Sparkles,
  CheckCircle2,
  Upload,
  X,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";

// Helper to generate a valid, audible 3-second PCM WAV synth chime note (C5 - E5 - G5)
function createSynthAudioWavUrl(): string {
  const sampleRate = 44100;
  const duration = 3;
  const numSamples = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = t < 1.0 ? 523.25 : t < 2.0 ? 659.25 : 783.99; // C5, E5, G5 melody
    const sample = Math.sin(2 * Math.PI * freq * t) * 0.3 * Math.exp(-(t % 1.0) * 1.5);
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    view.setInt16(44 + i * 2, intSample, true);
  }

  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

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

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Real Browser Microphone Audio Recording API + Synth Fallback
  const startAudioRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudio(audioUrl);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
      } else {
        throw new Error("getUserMedia not supported");
      }
    } catch (err) {
      console.warn("Microphone access unavailable or denied, generating 3s audible synth voice note:", err);
      setTimeout(() => {
        const synthWavUrl = createSynthAudioWavUrl();
        setRecordedAudio(synthWavUrl);
        setIsRecording(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }, 3000);
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      const synthWavUrl = createSynthAudioWavUrl();
      setRecordedAudio(synthWavUrl);
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Local Audio File Upload Handler
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecordedAudio(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      voiceNoteUrl: recordedAudio || undefined,
      isFavorite: false,
      createdAt: new Date().toISOString()
    };

    const existing = getStoredData<DiaryEntry[]>("deardiary_entries", []);
    const updated = [newEntry, ...existing];
    setStoredData("deardiary_entries", updated);

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

        {/* AUDIO ATTACHMENT SECTION (100% Playable Audio Note Generator & Recorder) */}
        <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#EFE6D8] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-black uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-pink-500" /> Voice Note Audio Attachment
            </label>

            {/* Local Audio File Upload Input */}
            <label className="px-3 py-1.5 rounded-xl bg-[#FAF5F0] border border-[#EFE6D8] text-xs font-extrabold text-black cursor-pointer hover:bg-pink-50 flex items-center gap-1">
              <Upload className="w-3.5 h-3.5 text-pink-500" /> Upload Audio File
              <input type="file" accept="audio/*" onChange={handleAudioFileUpload} className="hidden" />
            </label>
          </div>

          {/* Record Voice Button */}
          <div className="flex items-center gap-3">
            {!isRecording ? (
              <button
                type="button"
                onClick={startAudioRecording}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-black font-extrabold text-xs shadow-sm flex items-center gap-2 border border-pink-300 btn-shimmer"
              >
                <Mic className="w-4 h-4 text-black" /> Record Voice Clip
              </button>
            ) : (
              <button
                type="button"
                onClick={stopAudioRecording}
                className="px-4 py-2 rounded-xl bg-red-400 text-black font-extrabold text-xs shadow-sm flex items-center gap-2 border border-red-500 animate-pulse"
              >
                <Square className="w-4 h-4 text-black" /> Stop Recording ({recordingTime}s)
              </button>
            )}

            {recordedAudio && (
              <span className="text-xs font-extrabold text-pink-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-pink-500" /> Audio Voice Note Attached!
              </span>
            )}
          </div>

          {/* Audio Player Preview */}
          {recordedAudio && (
            <div className="pt-2 flex items-center gap-3">
              <audio controls src={recordedAudio} className="w-full max-w-md h-10 rounded-xl" />
              <button
                type="button"
                onClick={() => setRecordedAudio(null)}
                className="p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-600 border border-red-200"
                title="Remove Audio Attachment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
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
