<div align="center">

# 🌾 ZamindarAI

### Your crop. Your price. · آپ کی فصل، آپ کا دام

**An Urdu-first, AI-powered platform that helps Pakistani farmers diagnose crop problems, plan their season, check the weather, and sign fair sale contracts, without depending on middlemen.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-zamindarai1.vercel.app-2A2118?style=for-the-badge&logo=vercel&logoColor=white)](https://zamindarai1.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Google-Gemini%20AI-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Why ZamindarAI?

Small-scale farmers in Pakistan often lose money before their crop even reaches the market: they cannot identify diseases early, do not know the fair mandi rate, and sell through middlemen (*aarti*) who set the price. Many also find typing on a phone difficult.

ZamindarAI puts seven practical tools in one place, in **Urdu script with right-to-left layout**, and lets farmers **speak** their question and **hear** the answer.

## Features

| | Feature | What it does | Powered by |
|---|---|---|---|
| 🌾 | **Crop Doctor** | Describe the problem in text, upload a photo of the crop, or both. Returns the likely disease, treatment, and precautions. | Gemini (multimodal) |
| ⚖️ | **Price Oracle** | Shows mandi rates per 40 kg with price-trend indicators so farmers can judge whether an offer is fair. | Curated demo data |
| ✎ | **Deal Guardian** | Generates a sale agreement (unique ID, date, quantity, rate, total) and stores it permanently against the logged-in farmer. | Prisma + PostgreSQL |
| ☁️ | **Weather Alert** | Pulls live temperature, rain probability, and wind speed for major Punjab cities and turns them into spraying, irrigation, and frost advice. | Open-Meteo API + rule engine |
| ◆ | **Soil Advisor** | Recommends fertilizer, irrigation schedule, and precautions for a chosen soil type and crop. | Gemini |
| ◐ | **Voice Assistant** | The farmer speaks the problem and the app answers aloud. Built for farmers who cannot type easily. | Web Speech API + Gemini |
| ◷ | **Crop Calendar** | Month-by-month schedule from sowing to harvest for the six major crops. Falls back to a built-in calendar if the AI service is busy. | Gemini + offline fallback |

**Platform features:** account signup and login with hashed passwords, cookie-based sessions, an English/Urdu language toggle on the landing page, a custom wheat-and-harvest design system, and automatic deployment on every push.

## Screenshots

<p align="center">
  <img src="docs/screenshots/home.png" alt="ZamindarAI landing page in Urdu with English toggle" width="85%" /><br />
  <sub><b>Landing page</b>: Urdu-first with an English toggle</sub>
</p>

<table>
  <tr>
    <td align="center" width="50%">
      <img src="docs/screenshots/crop-doctor.png" alt="Crop Doctor" /><br />
      <sub><b>Crop Doctor</b>: describe the problem or upload a photo</sub>
    </td>
    <td align="center" width="50%">
      <img src="docs/screenshots/price-oracle.png" alt="Price Oracle" /><br />
      <sub><b>Price Oracle</b>: mandi rates with price trends</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="docs/screenshots/deal-guardian.png" alt="Deal Guardian" /><br />
      <sub><b>Deal Guardian</b>: sale agreements saved to the database</sub>
    </td>
    <td align="center" width="50%">
      <img src="docs/screenshots/weather-alert.png" alt="Weather Alert" /><br />
      <sub><b>Weather Alert</b>: live weather turned into crop advice</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="docs/screenshots/crop-calendar.png" alt="Crop Calendar" /><br />
      <sub><b>Crop Calendar</b>: sowing-to-harvest schedule</sub>
    </td>
    <td align="center" width="50%">
      <img src="docs/screenshots/voice-assistant.png" alt="Voice Assistant" /><br />
      <sub><b>Voice Assistant</b>: speak the problem, hear the answer</sub>
    </td>
  </tr>
</table>

## Architecture

```mermaid
flowchart LR
  U["Farmer<br/>Browser / Mobile"] --> N["Next.js App Router<br/>React 19 + Tailwind 4"]
  N --> A["Route Handlers<br/>/api/*"]
  A --> G["Google Gemini API"]
  A --> P[("PostgreSQL<br/>Neon via Prisma")]
  N --> W["Open-Meteo API"]
  N --> S["Web Speech API<br/>(in-browser)"]
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Route Handlers), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, custom warm-earth palette, RTL Urdu typography |
| AI | Google Gemini via `@google/genai` (text and image input) |
| Database | PostgreSQL on Neon (provisioned through the Vercel Marketplace) |
| ORM | Prisma 5.22 |
| Auth | `bcryptjs` password hashing, `httpOnly` cookie session |
| Voice | Browser Web Speech API (`SpeechRecognition`, `speechSynthesis`) |
| Weather | Open-Meteo (no API key required) |
| Hosting / CI | GitHub → Vercel (auto-deploy on push) |

## Project Structure

```
frontend/
├── app/
│   ├── api/
│   │   ├── crop-doctor/route.ts      # Gemini: text + image diagnosis
│   │   ├── soil-advisor/route.ts     # Gemini: soil & fertilizer advice
│   │   ├── crop-calendar/route.ts    # Gemini with offline fallback
│   │   ├── deal-guardian/route.ts    # Saves contracts to PostgreSQL
│   │   ├── signup/route.ts           # Account creation (bcrypt)
│   │   └── login/route.ts            # Authentication + session cookie
│   ├── crop-doctor/page.tsx
│   ├── price-oracle/page.tsx
│   ├── deal-guardian/page.tsx
│   ├── weather-alert/page.tsx
│   ├── soil-advisor/page.tsx
│   ├── voice-assistant/page.tsx
│   ├── crop-calendar/page.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── lib/prisma.ts                 # Shared Prisma client
│   └── page.tsx                      # Landing page (EN/UR toggle)
├── docs/
│   └── screenshots/                  # Images used in this README
└── prisma/
    └── schema.prisma                 # Farmer & Contract models
```

## Data Model

```prisma
model Farmer {
  id        Int        @id @default(autoincrement())
  name      String
  phone     String     @unique
  password  String     // bcrypt hash, never stored in plain text
  createdAt DateTime   @default(now())
  contracts Contract[]
}

model Contract {
  id         Int      @id @default(autoincrement())
  contractId String   @unique   // e.g. ZAI-R0V01TPI
  crop       String
  quantity   Int
  rate       Int
  total      Int
  createdAt  DateTime @default(now())
  farmer     Farmer   @relation(fields: [farmerId], references: [id])
  farmerId   Int
}
```

## API Reference

| Method | Endpoint | Body | Notes |
|---|---|---|---|
| `POST` | `/api/crop-doctor` | `{ question?, image? }` | `image` is a base64 data URL; either field may be sent |
| `POST` | `/api/soil-advisor` | `{ soilType, crop }` | |
| `POST` | `/api/crop-calendar` | `{ crop }` | Returns a built-in schedule if Gemini is unavailable |
| `POST` | `/api/deal-guardian` | `{ crop, quantity, rate }` | Requires the login cookie; returns `401` otherwise |
| `POST` | `/api/signup` | `{ name, phone, password }` | Rejects duplicate phone numbers |
| `POST` | `/api/login` | `{ phone, password }` | Sets the session cookie |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A free [Google AI Studio](https://aistudio.google.com/app/apikey) API key
- A PostgreSQL database (a free [Neon](https://neon.tech) project works well)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mfrajpoot1513-design/zamindarai1.git
cd zamindarai1

# 2. Install dependencies
npm install
```

### Environment variables

Create two files in the project root. They are git-ignored and must never be committed.

`.env.local`
```env
GEMINI_API_KEY="your-gemini-api-key"
```

`.env`
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### Create the database tables and run

```bash
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows tip:** if Turbopack fails with a PostCSS error on your machine, start the dev server with `npm run dev -- --webpack`.

## Deployment

The app is deployed on **Vercel**, connected to this GitHub repository, so every push to `main` triggers a new production build.

1. Import the repository in Vercel.
2. Add `GEMINI_API_KEY` under Environment Variables.
3. Add a Neon Postgres database from the Vercel Marketplace, which injects `DATABASE_URL` automatically.
4. The build script runs `prisma generate && next build`.

## Known Limitations

- **AI latency:** the free Gemini tier can be slow or return a temporary "high demand" error. Crop Calendar has an offline fallback, and the other AI features show a friendly retry message.
- **Price Oracle** currently displays curated demo rates, not a live mandi feed.
- **Voice Assistant** works best in Google Chrome. Spoken Urdu depends on the voices installed on the device and falls back to a Hindi voice when no Urdu voice exists.
- **Sessions** use a simple `httpOnly` cookie holding the farmer ID. Signed sessions or JWT would be the next hardening step.

## Roadmap

- [ ] Live mandi price integration
- [ ] Farmer dashboard with contract history
- [ ] Signed sessions (JWT) and contract verification via hash and QR code
- [ ] A central multi-agent orchestrator that routes a farmer's question to the right tool
- [ ] WhatsApp and SMS access for farmers without smartphones
- [ ] Punjabi, Saraiki, and Sindhi language support
- [ ] Installable PWA with offline access

## Acknowledgements

The product idea builds on the ZamindarAI concept presented at the **HEC Generative AI Hackathon (Cohort 3)**. This repository is an independent implementation, rebuilt from scratch and extended with authentication, a persistent database, live deployment, Weather Alert, Soil Advisor, Voice Assistant, photo-based diagnosis, Crop Calendar, and a full Urdu RTL interface.

## Author

**Mehak Fatima**, BSCS student

Built as an academic project to explore applied generative AI for agriculture.

---

<div align="center">

*Pakistan ke kisanon ke liye, kisanon ke sath.* 🌾

</div>
