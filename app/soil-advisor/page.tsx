"use client";

import { useState } from "react";
import Link from "next/link";

const soilTypes = ["Chikni mitti (Clay)", "Reti (Sandy)", "Domat (Loamy)", "Pata nahi"];
const crops = ["Gandum", "Chawal", "Kapas", "Ganna", "Makai", "Aloo", "Koi aur"];

export default function SoilAdvisor() {
  const [soilType, setSoilType] = useState(soilTypes[0]);
  const [crop, setCrop] = useState(crops[0]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/soil-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soilType, crop }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch (err) {
      setAnswer("Kuch masla ho gaya, dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118] font-sans" dir="rtl">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#B5622F]">AI</span>
        </Link>
        <Link href="/" className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors">
          ← واپس
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">مٹی کا مشیر</h1>
        <p className="text-[#5C4A38] mb-8">
          اپنی مٹی اور فصل بتائیں، خاد اور پانی کے مشورے پائیں۔
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">مٹی کی قسم</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] focus:outline-none focus:border-[#B5622F]"
            >
              {soilTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Fasal</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] focus:outline-none focus:border-[#B5622F]"
            >
              {crops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#B5622F] text-[#2A2118] font-semibold px-7 py-3 rounded-lg hover:bg-[#8B4A28] transition-colors disabled:opacity-50"
          >
            {loading ? "سوچ رہا ہے..." : "مشورہ لیں"}
          </button>
        </div>

        {answer && (
          <div className="mt-8 bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-6 whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        )}
      </main>
    </div>
  );
}