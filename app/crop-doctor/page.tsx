"use client";

import { useState } from "react";
import Link from "next/link";

export default function CropDoctor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    if (!question.trim() && !image) return;
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
        body: JSON.stringify({ question, image }),
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
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118] font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#B5622F]">AI</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors"
        >
          ← Wapis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Crop Doctor</h1>
        <p className="text-[#5C4A38] mb-8">
          Apni fasal ki problem batayein ya photo bhejein, AI aapko ilaj bataega.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Jaise: meri gandum ki fasal par zard dhabbay aa rahe hain... (ya sirf photo bhejein)"
          className="w-full h-32 bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-4 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F] resize-none"
        />

        <div className="mt-4">
          <label className="inline-flex items-center gap-2 border border-[#2A2118] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#EDE3D0] transition-colors text-sm">
            📷 Fasal ki tasveer lagayein
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Fasal preview"
              className="max-h-48 rounded-lg border border-[#2A2118]"
            />
            <button
              onClick={() => {
                setImage(null);
                setImagePreview(null);
              }}
              className="mt-2 text-xs text-[#5C4A38] hover:text-[#2A2118]"
            >
              ✕ Tasveer hatayein
            </button>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-[#B5622F] text-[#2A2118] font-semibold px-7 py-3 rounded-lg hover:bg-[#8B4A28] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-[#2A2118] border-t-transparent rounded-full animate-spin"></span>
              Sochh raha hai... ({seconds}s)
            </>
          ) : (
            "Poochein"
          )}
        </button>

        {loading && (
          <p className="mt-3 text-xs text-[#5C4A38]">
            AI jawab taiyar kar raha hai, thora intezar karein...
          </p>
        )}

        {answer && (
          <div className="mt-8 bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-6 whitespace-pre-line leading-relaxed">
            {answer}
          </div>
        )}
      </main>
    </div>
  );
}