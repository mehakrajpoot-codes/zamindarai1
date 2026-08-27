"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup() {
    if (!name || !phone || !password) {
      setError("Sab fields bharein.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Kuch masla ho gaya.");
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Kuch masla ho gaya, dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1C15] text-[#F5F1E8] font-sans flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-lg font-semibold tracking-tight block text-center mb-8">
          Zamindar<span className="text-[#8FBC6A]">AI</span>
        </Link>

        <h1 className="text-2xl font-bold mb-1 text-center">Account Banayein</h1>
        <p className="text-[#A8B5A0] text-sm mb-8 text-center">
          ZamindarAI use karne ke liye register karein
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#A8B5A0] block mb-1">Naam</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aapka naam"
              className="w-full bg-[#16241A] border border-[#2A3B2A] rounded-lg p-3 text-[#F5F1E8] placeholder-[#5A6B55] focus:outline-none focus:border-[#8FBC6A]"
            />
          </div>

          <div>
            <label className="text-sm text-[#A8B5A0] block mb-1">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03001234567"
              className="w-full bg-[#16241A] border border-[#2A3B2A] rounded-lg p-3 text-[#F5F1E8] placeholder-[#5A6B55] focus:outline-none focus:border-[#8FBC6A]"
            />
          </div>

          <div>
            <label className="text-sm text-[#A8B5A0] block mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#16241A] border border-[#2A3B2A] rounded-lg p-3 text-[#F5F1E8] placeholder-[#5A6B55] focus:outline-none focus:border-[#8FBC6A]"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-[#8FBC6A] text-[#0F1C15] font-semibold px-7 py-3 rounded-lg hover:bg-[#7DA85C] transition-colors disabled:opacity-50"
          >
            {loading ? "Ban raha hai..." : "Account Banayein"}
          </button>
        </div>

        <p className="text-center text-sm text-[#A8B5A0] mt-6">
          Pehle se account hai?{" "}
          <Link href="/login" className="text-[#8FBC6A] hover:underline">
            Login karein
          </Link>
        </p>
      </div>
    </div>
  );
}