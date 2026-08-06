# DearDiary 🌸 — Private Memory Vault & Digital Diary SaaS

**DearDiary** is a private, aesthetic, production-ready digital diary web application designed for personal reflection, memory preservation, mood tracking, photo vault management, future time-capsule letters, and AI reflection companion.

---

## ✨ Features

- **Daily Journal**: Rich text editor with formatting, mood intensity slider, weather & location markers, voice notes recorder simulator, photo attachments, and tag manager.
- **Memory Timeline**: Chronological feed of memories filtered by Year, Month, Mood, and Tags with favorite toggles.
- **Mood Analytics**: Mood check-in logger, mood distribution charts, and monthly mood calendar map.
- **Private Photo Vault**: Curated photo albums, photo lightbox viewer, and image storage.
- **Future Time Capsules**: Write sealed letters to your future self, family, or friends with scheduled unlock dates and email notification reminders.
- **AI Companion**: Generates personalized journal prompts, memory summaries, and compassionate reflection guidance.
- **Custom Theme Engine**: Switch between 4 aesthetic pastel palettes (*Blush Rose*, *Lavender Mist*, *Sunset Glow*, *Midnight Calm*) and Light/Dark modes.
- **Marketing & Admin**: Hero landing page, interactive live preview tabs, pricing tables, FAQ accordion, and Admin metrics portal ($MRR, user growth, uptime).

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Glassmorphism design system
- **Animations**: Framer Motion
- **ORM & DB**: Prisma ORM (SQLite / PostgreSQL)
- **State & Store**: Local store engine (`localStorage` + mock seeds) with zero setup required

---

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Prisma Migration**:
   ```bash
   npx prisma db push
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Deployment

- **Deployment**: Vercel ready (`vercel` or GitHub auto-deploy).
- **Environment Variables**: Copy `.env.example` to `.env.local` for custom keys.
# DearDiary
