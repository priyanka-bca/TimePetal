"use client";

import { create } from "zustand";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: "Happy" | "Sad" | "Excited" | "Calm" | "Angry" | "Loved" | "Anxious";
  moodRating: number;
  location?: string;
  weather?: string;
  tags: string[];
  voiceNoteUrl?: string;
  isFavorite: boolean;
  photos: string[];
  createdAt: string;
}

export interface MoodLog {
  id: string;
  mood: "Happy" | "Sad" | "Excited" | "Calm" | "Angry" | "Loved" | "Anxious";
  intensity: number; // 1 - 10
  note?: string;
  triggers?: string[];
  date: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  albumId?: string;
  isFavorite: boolean;
  date: string;
}

export interface AlbumItem {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  createdAt: string;
}

export interface FutureLetter {
  id: string;
  recipient: "Self" | "Family" | "Friend";
  title: string;
  content: string;
  deliverDate: string; // ISO date string
  isOpened: boolean;
  notifyEmail?: string;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  theme: "blush" | "lavender" | "sunset" | "midnight";
  streakDays: number;
}

const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: "entry-1",
    title: "A Quiet Sunday Morning with Matcha & Warm Rain",
    content: "<p>Woke up to the gentle patter of raindrops against the bedroom window. Brewed a fresh cup of ceremonial grade matcha, wrapped myself in a soft cashmere knit, and listened to classical piano while watching the fog settle over the garden.</p><p>Reflecting on how much peace I've cultivated this month. Moments like this remind me that slow living isn't a privilege—it's an intentional choice.</p>",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    mood: "Calm",
    moodRating: 9,
    location: "Home Sanctuary, Kyoto",
    weather: "Rainy 🌧️",
    tags: ["Mindfulness", "SlowLiving", "Gratitude"],
    isFavorite: true,
    photos: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "entry-2",
    title: "Sunset Stroll Along the Rose Garden Coast",
    content: "<p>Walked down to the cliffs near the botanical gardens as the horizon melted into shades of dusty rose, lilac, and gold. The ocean breeze smelled like fresh sea salt and wild jasmine.</p><p>Had a heartwarming phone call with Mum. We laughed about childhood memories and planned our autumn countryside trip.</p>",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    mood: "Loved",
    moodRating: 10,
    location: "Botanical Cliff Walk",
    weather: "Sunny 🌅",
    tags: ["Family", "Nature", "Sunset"],
    isFavorite: true,
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "entry-3",
    title: "Finishing the First Draft of My Creative Manuscript!",
    content: "<p>I CANNOT CONTAIN MY JOY! 🎉 After 6 months of early morning writing sessions before sunrise, I finally hit 50,000 words on the novel draft. My heart feels so full and proud.</p><p>Treated myself to lavender gelato and sat in the park reading poetry.</p>",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    mood: "Excited",
    moodRating: 10,
    location: "Le Petit Café",
    weather: "Sunny ☀️",
    tags: ["Milestone", "Writing", "Celebration"],
    isFavorite: false,
    photos: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
    ],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  }
];

const INITIAL_MOODS: MoodLog[] = [
  { id: "m-1", mood: "Calm", intensity: 9, note: "Morning matcha & meditation", date: new Date().toISOString() },
  { id: "m-2", mood: "Loved", intensity: 10, note: "Family phone call", date: new Date(Date.now() - 86400000 * 1).toISOString() },
  { id: "m-3", mood: "Happy", intensity: 8, note: "Completed work project", date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: "m-4", mood: "Excited", intensity: 10, note: "Finished novel draft!", date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: "m-5", mood: "Calm", intensity: 7, note: "Evening yoga flow", date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: "m-6", mood: "Loved", intensity: 9, note: "Dinner with close friends", date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: "m-7", mood: "Happy", intensity: 8, note: "Fresh flowers & crisp air", date: new Date(Date.now() - 86400000 * 6).toISOString() }
];

const INITIAL_ALBUMS: AlbumItem[] = [
  {
    id: "album-1",
    title: "Autumn Whispers & Botanical Strolls",
    description: "Capturing golden light, fallen leaves, and quiet coffee shops.",
    coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: "album-2",
    title: "Cozy Home & Morning Rituals",
    description: "Matcha, candles, linen sheets, and gentle mornings.",
    coverUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
  }
];

const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: "p-1",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    caption: "Morning tea in ceramic cup with soft natural light",
    albumId: "album-2",
    isFavorite: true,
    date: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "p-2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    caption: "Quiet corner in the bookstore coffee shop",
    albumId: "album-2",
    isFavorite: true,
    date: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "p-3",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    caption: "Sunset over the rose garden ocean horizon",
    albumId: "album-1",
    isFavorite: true,
    date: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "p-4",
    url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    caption: "Vintage fountain pen and leather notebook draft",
    albumId: "album-1",
    isFavorite: false,
    date: new Date(Date.now() - 86400000 * 6).toISOString()
  }
];

const INITIAL_LETTERS: FutureLetter[] = [
  {
    id: "letter-1",
    recipient: "Self",
    title: "To Me on My 30th Birthday: Are You Still Living Softly?",
    content: "Dear Future Me, I hope you are reading this surrounded by warmth, flowers, and peace. Remember how hard you worked for the quiet life you have now. Don't forget to take slow deep breaths and love yourself unconditionally.",
    deliverDate: new Date(Date.now() + 86400000 * 180).toISOString(),
    isOpened: false,
    notifyEmail: "sophia@deardiary.app",
    createdAt: new Date().toISOString()
  },
  {
    id: "letter-2",
    recipient: "Family",
    title: "A Letter of Pure Appreciation for Mum",
    content: "Mum, thank you for teaching me how to find beauty in small things—in fresh tea, blooming jasmine, and forgiving kindness.",
    deliverDate: new Date(Date.now() + 86400000 * 60).toISOString(),
    isOpened: false,
    notifyEmail: "mum@deardiary.app",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

// Local Storage Helper / Store Mock (User Isolated)
export const getStoredData = <T>(key: string, fallback: T, userId?: string | null): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const storageKey = userId ? `${key}_${userId}` : key;
    const item = localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const setStoredData = <T>(key: string, value: T, userId?: string | null): void => {
  if (typeof window === "undefined") return;
  try {
    const storageKey = userId ? `${key}_${userId}` : key;
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save failed", e);
  }
};

