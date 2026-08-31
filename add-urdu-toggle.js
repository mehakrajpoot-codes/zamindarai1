const fs = require('fs');
const path = require('path');

const content = `"use client";

import Link from "next/link";
import { useState } from "react";

const features_en = [
  { href: "/crop-doctor", name: "Crop Doctor", desc: "Diagnose crop diseases from a photo or description.", mark: "\ud83c\udf3e" },
  { href: "/price-oracle", name: "Price Oracle", desc: "Get fair market rates, avoid middleman losses.", mark: "\u2696" },
  { href: "/deal-guardian", name: "Deal Guardian", desc: "Secure, verifiable sale contracts.", mark: "\u270e" },
  { href: "/weather-alert", name: "Weather Alert", desc: "Live weather advice to protect your crop.", mark: "\u2601" },
  { href: "/soil-advisor", name: "Soil Advisor", desc: "Fertilizer and watering advice for your soil.", mark: "\u25c6" },
  { href: "/voice-assistant", name: "Voice Assistant", desc: "Speak your problem, get a spoken AI answer.", mark: "\u25d0" },
];

const features_ur = [
  { href: "/crop-doctor", name: "\u06a9\u0631\u0627\u067e \u0688\u0627\u06a9\u0679\u0631", desc: "\u062a\u0635\u0648\u06cc\u0631 \u06cc\u0627 \u0648\u0636\u0627\u062d\u062a \u0633\u06d2 \u0641\u0635\u0644 \u06a9\u06cc \u0628\u06cc\u0645\u0627\u0631\u06cc \u06a9\u06cc \u062a\u0634\u062e\u06cc\u0635\u06d4", mark: "\ud83c\udf3e" },
  { href: "/price-oracle", name: "\u067e\u0631\u0627\u0626\u0633 \u0627\u0648\u0631\u06cc\u06a9\u0644", desc: "\u0645\u0646\u0688\u06cc \u06a9\u0627 \u0635\u062d\u06cc\u062d \u0631\u06cc\u0679\u060c \u0622\u0691\u062a\u06cc \u06a9\u06d2 \u063a\u0644\u0637 \u062f\u0627\u0645 \u0633\u06d2 \u0628\u0686\u0627\u0624\u06d4", mark: "\u2696" },
  { href: "/deal-guardian", name: "\u068a\u06cc\u0644 \u06af\u0627\u0631\u0688\u06cc\u0646", desc: "\u0645\u062d\u0641\u0648\u0638\u060c \u062a\u0635\u062f\u06cc\u0642 \u0634\u062f\u06c1 \u0641\u0631\u0648\u062e\u062a \u06a9\u0627 \u0627\u06cc\u06af\u0631\u06cc\u0645\u0646\u0679\u06d4", mark: "\u270e" },
  { href: "/weather-alert", name: "\u0645\u0648\u0633\u0645 \u0627\u0644\u0631\u0679", desc: "\u0645\u0648\u0633\u0645 \u062f\u06cc\u06a9\u06be \u06a9\u0631 \u0641\u0635\u0644 \u06a9\u06cc \u062d\u0641\u0627\u0638\u062a \u06a9\u06d2 \u0645\u0634\u0648\u0631\u06d2\u06d4", mark: "\u2601" },
  { href: "/soil-advisor", name: "\u0645\u0679\u06cc \u06a9\u0627 \u0645\u0634\u06cc\u0631", desc: "\u0645\u0679\u06cc \u0627\u0648\u0631 \u062e\u0627\u062f \u06a9\u06d2 \u0645\u0634\u0648\u0631\u06d2\u060c \u0628\u06c1\u062a\u0631 \u067e\u06cc\u062f\u0627\u0648\u0627\u0631 \u06a9\u06d2 \u0644\u0626\u06d2\u06d4", mark: "\u25c6" },
  { href: "/voice-assistant", name: "\u0622\u0648\u0627\u0632\u06cc \u0627\u0633\u0633\u0679\u0646\u0679", desc: "\u0628\u0648\u0644\u06cc\u06ba \u0627\u067e\u0646\u06cc \u067e\u0631\u0627\u0628\u0644\u0645\u060c AI \u0622\u0648\u0627\u0632 \u0645\u06cc\u06ba \u062c\u0648\u0627\u0628 \u062f\u06d2 \u06af\u0627\u06d4", mark: "\u25d0" },
];

export default function Home() {
  const [lang, setLang] = useState("ur");
  const isUr = lang === "ur";
  const features = isUr ? features_ur : features_en;

  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118]" dir={isUr ? "rtl" : "ltr"}>
      <header className="relative flex items-center justify-between px-8 sm:px-14 py-7 max-w-6xl mx-auto">
        <span className="text-2xl tracking-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Zamindar<span className="text-[#B5622F] italic">AI</span>
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(isUr ? "en" : "ur")}
            className="text-xs border border-[#2A2118]/30 px-3 py-1.5 rounded-full hover:bg-[#EDE3D0] transition-colors"
          >
            {isUr ? "English" : "\u0627\u0631\u062f\u0648"}
          </button>
          <Link href="/login" className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors">{isUr ? "\u0644\u0627\u06af \u0627\u0646" : "Login"}</Link>
          <Link href="/signup" className="text-sm bg-[#2A2118] text-[#F4EDE0] px-5 py-2.5 rounded-sm font-medium hover:bg-[#3D2817] transition-colors">{isUr ? "\u0631\u062c\u0633\u0679\u0631" : "Signup"}</Link>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-8 sm:px-14 pt-16 pb-28">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B5622F] font-semibold mb-6">
          {isUr ? "\u06a9\u0633\u0627\u0646 \u06a9\u0627 \u0627\u067e\u0646\u0627 \u0633\u0627\u062a\u06be\u06cc" : "Kisan ka apna sathi"}
        </p>
        <h1 className="text-[2.75rem] sm:text-7xl leading-[1.05] tracking-tight max-w-3xl" style={{ fontFamily: isUr ? "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" : "Georgia, serif" }}>
          {isUr ? (
            <>\u0622\u067e \u06a9\u06cc \u0641\u0635\u0644\u0964<br /><span className="text-[#B5622F]">\u0622\u067e \u06a9\u0627 \u062f\u0627\u0645\u0964</span></>
          ) : (
            <>Your crop.<br /><span className="text-[#B5622F]">Your price.</span></>
          )}
        </h1>
        <p className="mt-8 text-lg text-[#5C4A38] max-w-xl leading-relaxed">
          {isUr
            ? "\u0632\u0645\u06cc\u0646\u062f\u0627\u0631 AI \u067e\u0627\u06a9\u0633\u062a\u0627\u0646 \u06a9\u06d2 \u06a9\u0633\u0627\u0646\u0648\u06ba \u06a9\u0648 \u0635\u062d\u06cc\u062d \u0645\u0646\u0688\u06cc \u0631\u06cc\u0679\u060c \u0641\u0635\u0644 \u06a9\u06cc \u0628\u06cc\u0645\u0627\u0631\u06cc \u06a9\u06cc \u062a\u0634\u062e\u06cc\u0635\u060c \u0627\u0648\u0631 \u0645\u062d\u0641\u0648\u0638 \u0627\u06cc\u06af\u0631\u06cc\u0645\u0646\u0679\u0633 \u062f\u06cc\u062a\u0627 \u06c1\u06d2 \u2014 \u0628\u063a\u06cc\u0631 \u06a9\u0633\u06cc \u0628\u06cc\u0686\u0648\u06ba \u0628\u06cc\u0686 \u0648\u0627\u0644\u06d2 \u06a9\u06d2\u06d4"
            : "ZamindarAI gives Pakistani farmers fair market prices, AI crop disease diagnosis, and secure contracts — with no middleman."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/crop-doctor" className="bg-[#2A2118] text-[#F4EDE0] font-medium px-8 py-4 rounded-sm hover:bg-[#3D2817] transition-colors text-center">
            {isUr ? "\u0634\u0631\u0648\u0639 \u06a9\u0631\u06cc\u06ba" : "Get Started"}
          </a>
          <button className="border border-[#2A2118]/25 px-8 py-4 rounded-sm hover:border-[#2A2118] transition-colors text-[#3D2817]">
            {isUr ? "\u0645\u0632\u06cc\u062f \u062c\u0627\u0646\u06cc\u06ba" : "Learn More"}
          </button>
        </div>
      </main>

      <section className="relative border-t border-[#2A2118]/10">
        <div className="max-w-6xl mx-auto px-8 sm:px-14 py-20">
          <h2 className="text-3xl sm:text-4xl mb-14 max-w-lg" style={{ fontFamily: isUr ? "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" : "Georgia, serif" }}>
            {isUr ? "\u06c1\u0631 \u0645\u0648\u0633\u0645\u060c \u06c1\u0631 \u0645\u0633\u0626\u0644\u06c1 \u0627\u06cc\u06a9 \u062c\u06af\u06c1\u06d4" : "Every season, every problem, one place."}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2A2118]/10 border border-[#2A2118]/10">
            {features.map((f) => (
              <a key={f.href} href={f.href} className="group bg-[#F4EDE0] hover:bg-[#EDE3D0] transition-colors p-8 flex flex-col gap-4">
                <span className="text-2xl text-[#B5622F]">{f.mark}</span>
                <div>
                  <p className="font-semibold text-lg mb-1.5 group-hover:text-[#B5622F] transition-colors">{f.name}</p>
                  <p className="text-sm text-[#5C4A38] leading-relaxed">{f.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative border-t border-[#2A2118]/10 py-10">
        <p className="text-center text-xs text-[#5C4A38]/70 tracking-wide">
          {isUr ? "\u0632\u0645\u06cc\u0646\u062f\u0627\u0631 AI \u2014 \u067e\u0627\u06a9\u0633\u062a\u0627\u0646 \u06a9\u06d2 \u06a9\u0633\u0627\u0646\u0648\u06ba \u06a9\u06d2 \u0644\u0626\u06d2\u06d4" : "ZamindarAI \u2014 Built for Pakistani farmers."}
        </p>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'app/page.tsx'), content, 'utf8');
console.log('DONE: Urdu toggle added to home page');