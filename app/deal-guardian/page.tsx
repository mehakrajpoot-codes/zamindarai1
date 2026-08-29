"use client";

import { useState } from "react";
import Link from "next/link";

export default function DealGuardian() {
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");
  const [contract, setContract] = useState<null | {
    contractId: string;
    createdAt: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  async function generateContract() {
    if (!crop || !quantity || !rate) return;
    setLoading(true);

    try {
      const res = await fetch("/api/deal-guardian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, quantity, rate }),
      });
      const data = await res.json();
      if (data.contract) {
        setContract({
          contractId: data.contract.contractId,
          createdAt: new Date(data.contract.createdAt).toLocaleDateString("en-GB"),
        });
      }
    } catch (err) {
      alert("Kuch masla ho gaya, dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  }

  const total = quantity && rate ? Number(quantity) * Number(rate) : 0;

  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118] font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#B5622F]">AI</span>
        </Link>
        <Link href="/" className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors">
          ← Wapis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Deal Guardian</h1>
        <p className="text-[#5C4A38] mb-8">
          Fasal bechne ka mehfooz, verify-able contract banayein.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Fasal ka naam</label>
            <input
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="jaise: Gandum"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Miqdar (man/40kg mein)</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="jaise: 50"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">Rate fi man (Rs)</label>
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              type="number"
              placeholder="jaise: 3200"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <button
            onClick={generateContract}
            disabled={loading}
            className="bg-[#B5622F] text-[#2A2118] font-semibold px-7 py-3 rounded-lg hover:bg-[#8B4A28] transition-colors disabled:opacity-50"
          >
            {loading ? "Ban raha hai..." : "Contract Banayein"}
          </button>
        </div>

        {contract && (
          <div className="mt-8 bg-[#EDE3D0] border border-[#B5622F] rounded-lg p-6">
            <p className="text-[#B5622F] text-sm font-medium mb-4">✓ Contract Save Ho Gaya (Database Mein)</p>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#5C4A38]">Contract ID:</span> {contract.contractId}</p>
              <p><span className="text-[#5C4A38]">Tareekh:</span> {contract.createdAt}</p>
              <p><span className="text-[#5C4A38]">Fasal:</span> {crop}</p>
              <p><span className="text-[#5C4A38]">Miqdar:</span> {quantity} man</p>
              <p><span className="text-[#5C4A38]">Rate:</span> Rs {rate} fi man</p>
              <p className="text-[#B5622F] font-semibold text-base pt-2 border-t border-[#2A2118] mt-2">
                Kul Raqam: Rs {total.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}