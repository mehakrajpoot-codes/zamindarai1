"use client";

import Link from "next/link";
import { useState } from "react";

const features_en = [
  { href: "/crop-doctor", name: "Crop Doctor", desc: "Diagnose crop diseases from a photo or description.", mark: "🌾" },
  { href: "/price-oracle", name: "Price Oracle", desc: "Get fair market rates, avoid middleman losses.", mark: "⚖" },
  { href: "/deal-guardian", name: "Deal Guardian", desc: "Secure, verifiable sale contracts.", mark: "✎" },
  { href: "/weather-alert", name: "Weather Alert", desc: "Live weather advice to protect your crop.", mark: "☁" },
  { href: "/soil-advisor", name: "Soil Advisor", desc: "Fertilizer and watering advice for your soil.", mark: "◆" },
  { href: "/voice-assistant", name: "Voice Assistant", desc: "Speak your problem, get a spoken AI answer.", mark: "◐" },
  { href: "/crop-calendar", name: "Crop Calendar", desc: "Sowing to harvest schedule for your crop.", mark: "◷" },
];

const features_ur = [
  { href: "/crop-doctor", name: "کراپ ڈاکٹر", desc: "تصویر یا وضاحت سے فصل کی بیماری کی تشخیص۔", mark: "🌾" },
  { href: "/price-oracle", name: "پرائس اوریکل", desc: "منڈی کا صحیح ریٹ، آڑتی کے غلط دام سے بچاؤ۔", mark: "⚖" },
  { href: "/deal-guardian", name: "ڊیل گارڈین", desc: "محفوظ، تصدیق شدہ فروخت کا ایگریمنٹ۔", mark: "✎" },
  { href: "/weather-alert", name: "موسم الرٹ", desc: "موسم دیکھ کر فصل کی حفاظت کے مشورے۔", mark: "☁" },
  { href: "/soil-advisor", name: "مٹی کا مشیر", desc: "مٹی اور خاد کے مشورے، بہتر پیداوار کے لئے۔", mark: "◆" },
  { href: "/voice-assistant", name: "آوازی اسسٹنٹ", desc: "بولیں اپنی پرابلم، AI آواز میں جواب دے گا۔", mark: "◐" },
  { href: "/crop-calendar", name: "فصل کیلنڈر", desc: "بوائی سے کٹائی تک کا مکمل شیڈول۔", mark: "◷" },
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
            {isUr ? "English" : "اردو"}
          </button>
          <Link href="/login" className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors">{isUr ? "لاگ ان" : "Login"}</Link>
          <Link href="/signup" className="text-sm bg-[#2A2118] text-[#F4EDE0] px-5 py-2.5 rounded-sm font-medium hover:bg-[#3D2817] transition-colors">{isUr ? "رجسٹر" : "Signup"}</Link>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-8 sm:px-14 pt-16 pb-28">
        <p className="text-xs tracking-[0.25em] uppercase text-[#B5622F] font-semibold mb-6">
          {isUr ? "کسان کا اپنا ساتھی" : "Kisan ka apna sathi"}
        </p>
        <h1 className="text-[2.75rem] sm:text-7xl leading-[1.05] tracking-tight max-w-3xl" style={{ fontFamily: isUr ? "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" : "Georgia, serif" }}>
          {isUr ? (
            <>آپ کی فصل۔<br /><span className="text-[#B5622F]">آپ کا دام۔</span></>
          ) : (
            <>Your crop.<br /><span className="text-[#B5622F]">Your price.</span></>
          )}
        </h1>
        <p className="mt-8 text-lg text-[#5C4A38] max-w-xl leading-relaxed">
          {isUr
            ? "زمیندار AI پاکستان کے کسانوں کو صحیح منڈی ریٹ، فصل کی بیماری کی تشخیص، اور محفوظ ایگریمنٹس دیتا ہے — بغیر کسی بیچوں بیچ والے کے۔"
            : "ZamindarAI gives Pakistani farmers fair market prices, AI crop disease diagnosis, and secure contracts — with no middleman."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a href="/crop-doctor" className="bg-[#2A2118] text-[#F4EDE0] font-medium px-8 py-4 rounded-sm hover:bg-[#3D2817] transition-colors text-center">
            {isUr ? "شروع کریں" : "Get Started"}
          </a>
          <button className="border border-[#2A2118]/25 px-8 py-4 rounded-sm hover:border-[#2A2118] transition-colors text-[#3D2817]">
            {isUr ? "مزید جانیں" : "Learn More"}
          </button>
        </div>
      </main>

      <section className="relative border-t border-[#2A2118]/10">
        <div className="max-w-6xl mx-auto px-8 sm:px-14 py-20">
          <h2 className="text-3xl sm:text-4xl mb-14 max-w-lg" style={{ fontFamily: isUr ? "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif" : "Georgia, serif" }}>
            {isUr ? "ہر موسم، ہر مسئلہ ایک جگہ۔" : "Every season, every problem, one place."}
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
          {isUr ? "زمیندار AI — پاکستان کے کسانوں کے لئے۔" : "ZamindarAI — Built for Pakistani farmers."}
        </p>
      </footer>
    </div>
  );
}