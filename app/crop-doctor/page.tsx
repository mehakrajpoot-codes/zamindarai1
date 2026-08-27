"use client";

import { useState } from "react";
import Link from "next/link";

export default function CropDoctor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  async function handleSubmit() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    setSeconds(0);

    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch("/api/crop-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });
      const data = await res.json();
      setAnswer(data.answer || data.error);
    } catch (err) {
      setAnswer(
        "AI abhi thoda busy hai (free service hai, kabhi kabhi der lagti hai). Dobara koshish karein."
      );
    } finally {
      clearTimeout(timeoutId);
      clearInterval(timer);
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
          className="mt-4 bg-[#8FBC6A] text-[#0F1C15] font-semibold px-7 py-3 rounded-lg hover:bg-[#7DA85C] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-[#0F1C15] border-t-transparent rounded-full animate-spin"></span>
              Sochh raha hai... ({seconds}s)
            </>
          ) : (
            "Poochein"
          )}
        </button>

        {loading && (
          <p className="mt-3 text-xs text-[#5A6B55]">
            AI jawab taiyar kar raha hai, thora intezar karein...
          </p>
        )}

        {answer && (
          <div className="mt-8 bg-[#16241A] border border-[#2A3B2A] rounded-lg p-6 whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        )}
      </main>
    </div>
  );
}