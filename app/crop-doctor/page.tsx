"use client";

import { useState } from "react";
import Link from "next/link";

export default function CropDoctor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/crop-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
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
    <div className="min-h-screen bg-[#0F1C15] text-[#F5F1E8] font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#8FBC6A]">AI</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-[#A8B5A0] hover:text-[#F5F1E8] transition-colors"
        >
          ← Wapis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Crop Doctor</h1>
        <p className="text-[#A8B5A0] mb-8">
          Apni fasal ki problem batayein, AI aapko ilaj bataega.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Jaise: meri gandum ki fasal par zard dhabbay aa rahe hain..."
          className="w-full h-32 bg-[#16241A] border border-[#2A3B2A] rounded-lg p-4 text-[#F5F1E8] placeholder-[#5A6B55] focus:outline-none focus:border-[#8FBC6A] resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-[#8FBC6A] text-[#0F1C15] font-semibold px-7 py-3 rounded-lg hover:bg-[#7DA85C] transition-colors disabled:opacity-50"
        >
          {loading ? "Sochh raha hai..." : "Poochein"}
        </button>

        {answer && (
          <div className="mt-8 bg-[#16241A] border border-[#2A3B2A] rounded-lg p-6 whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        )}
      </main>
    </div>
  );
}