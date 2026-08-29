"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!phone || !password) {
      setError("Sab fields bharein.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
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
    <div className="min-h-screen bg-[#2A2118] text-[#2A2118] font-sans flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-lg font-semibold tracking-tight block text-center mb-8">
          Zamindar<span className="text-[#B5622F]">AI</span>
        </Link>

        <h1 className="text-2xl font-bold mb-1 text-center">Login Karein</h1>
        <p className="text-[#5C4A38] text-sm mb-8 text-center">
          Apne account mein wapis aayein
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03001234567"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#B5622F] text-[#2A2118] font-semibold px-7 py-3 rounded-lg hover:bg-[#8B4A28] transition-colors disabled:opacity-50"
          >
            {loading ? "Aa rahe hain..." : "Login Karein"}
          </button>
        </div>

        <p className="text-center text-sm text-[#5C4A38] mt-6">
          Account nahi hai?{" "}
          <Link href="/signup" className="text-[#B5622F] hover:underline">
            Signup karein
          </Link>
        </p>
      </div>
    </div>
  );
}