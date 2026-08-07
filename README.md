# TimePetal 🌸 — Private Memory Vault & Digital Diary SaaS

**TimePetal** is a private, aesthetic, production-ready digital diary web application designed for personal reflection, memory preservation, mood tracking, photo vault management, future time-capsule letters, and AI reflection companion.

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

## 🔐 Authentication & Google OAuth Setup

DearDiary comes built with a complete, production-grade Authentication System supporting:
1. **Email / Password Authentication** (Registration, Bcrypt password hashing, rate limiting, and password policy enforcement)
2. **Google OAuth 2.0** (Sign in & Sign up with Google, account linking, automatic profile creation)
3. **Email Verification** (Signed 24h expiration tokens sent via Nodemailer/SMTP)
4. **Password Resets** (Single-use 1h hashed tokens sent via email)
5. **Middleware Route Protection** (Securing `/dashboard`, `/profile`, and redirecting unauthenticated users)

### 🔑 Google OAuth Setup Instructions

To enable **Sign in with Google**:

1. Go to the **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Create a new project (e.g., `DearDiary-Auth`).
3. Navigate to **APIs & Services** > **OAuth consent screen**:
   - User Type: Select **External**.
   - Fill in App Name (*DearDiary*), User Support Email, and Developer Contact Info.
   - Save and continue.
4. Navigate to **APIs & Services** > **Credentials**:
   - Click **+ Create Credentials** -> **OAuth client ID**.
   - Application type: Select **Web application**.
   - Name: `DearDiary Web Client`.
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (for local development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/callback/google` (for local development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Copy the generated **Client ID** and **Client Secret**.
6. Paste them into your `.env.local` file:
   ```env
   AUTH_SECRET="your-32-character-random-secret-key"
   NEXTAUTH_SECRET="your-32-character-random-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

