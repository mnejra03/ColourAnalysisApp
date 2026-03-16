# Seasonal Colour Analysis App

Discover your seasonal colour palette using AI. Upload a photo or answer a quiz, and get a personalised palette, styling tips, and more.

## Tech Stack

- **React + Vite** — frontend
- **Supabase** — authentication + database
- **Netlify Functions** — serverless backend (protects Anthropic API key)
- **Claude AI** — colour analysis
- **Netlify** — hosting + deploy

---

## Features

- 📸 **Photo Analysis** — upload a face photo, Claude AI analyses your colouring
- ✏️ **Colour Quiz** — answer 4 questions about skin, eyes, hair, and contrast
- 🎨 **Personalised Palette** — 8 colours with hex codes (click to copy)
- 💄 **Styling Tips** — what to wear, what to avoid, makeup recommendations
- ⭐ **Celebrity Matches** — see which celebrities share your season
- 👤 **Profile** — save and review all past analyses
- 🔐 **Auth** — email/password via Supabase

---

## The Four Seasons

| Season | Undertone | Depth |
|--------|-----------|-------|
| 🌸 Spring | Warm | Light |
| 🌊 Summer | Cool | Light |
| 🍂 Autumn | Warm | Deep |
| ❄️ Winter | Cool | Deep |

---

## Local Setup

### 1. Clone & install
```bash
git clone <your-repo-url>
cd colour-analysis-app
npm install
```

### 2. Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Copy your **Project URL** and **anon key** from Settings → API

### 3. Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create a new API key

### 4. Environment variables

Create a `.env` file in the root folder:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### 5. Run locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
3. Connect your GitHub repo
4. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in **Site settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
6. Click **Deploy site** 🚀

Every `git push` will automatically trigger a new deploy.

---

## Made with 💛 using React, Supabase & Claude AI
