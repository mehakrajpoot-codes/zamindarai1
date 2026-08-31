"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recognitionRef = useRef<any>(null);

  function startListening() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Aapka browser voice input support nahi karta. Chrome use karein.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ur-PK";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      askAI(text);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Awaz samajh nahi aayi, dobara koshish karein.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  }

  async function askAI(text: string) {
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
        body: JSON.stringify({ question: text }),
        signal: controller.signal,
      });
      const data = await res.json();
      const result = data.answer || data.error;
      setAnswer(result);
      speakAnswer(result);
    } catch (err) {
      setAnswer("AI abhi thoda busy hai, dobara koshish karein.");
    } finally {
      clearTimeout(timeoutId);
      clearInterval(timer);
      setLoading(false);
    }
  }

  function speakAnswer(text: string) {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const urduVoice = voices.find((v) => v.lang === "ur-PK" || v.lang === "ur-IN");
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    const bestVoice = urduVoice || hindiVoice;

    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    } else {
      utterance.lang = "hi-IN";
    }
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
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

      <main className="max-w-2xl mx-auto px-8 py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">آوازی اسسٹنٹ</h1>
        <p className="text-[#5C4A38] mb-10">
          بولیں اپنی فصل کی پرابلم، AI آواز میں جواب دے گا۔
        </p>

        <button
          onClick={startListening}
          disabled={listening || loading}
          className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl transition-all mx-auto ${
            listening
              ? "bg-red-500 animate-pulse"
              : "bg-[#B5622F] hover:bg-[#8B4A28]"
          } disabled:opacity-50`}
        >
          🎤
        </button>

        <p className="mt-4 text-sm text-[#5C4A38]">
          {listening ? "Sun raha hoon... bolein" : loading ? `Sochh raha hoon... (${seconds}s)` : "مائک دبائیں اور بولیں"}
        </p>

        {transcript && (
          <div className="mt-8 text-left bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-4">
            <p className="text-xs text-[#5C4A38] mb-1">Aapne kaha:</p>
            <p>{transcript}</p>
          </div>
        )}

        {answer && (
          <div className="mt-4 text-left bg-[#EDE3D0] border border-[#B5622F] rounded-lg p-6 whitespace-pre-line leading-relaxed">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#B5622F]">AI ka jawab:</p>
              {speaking && (
                <button
                  onClick={stopSpeaking}
                  className="text-xs text-[#5C4A38] hover:text-[#2A2118]"
                >
                  🔇 Chup karein
                </button>
              )}
            </div>
            {answer}
          </div>
        )}
      </main>
    </div>
  );
}