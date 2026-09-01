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
      alert("کچھ مسئلہ ہو گیا، دوبارہ کوشش کریں۔");
    } finally {
      setLoading(false);
    }
  }

  const total = quantity && rate ? Number(quantity) * Number(rate) : 0;

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
        <h1 className="text-3xl font-bold mb-2">ڈیل گارڈین</h1>
        <p className="text-[#5C4A38] mb-8">
          فصل بیچنے کا محفوظ ایگریمنٹ بنائیں۔
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">فصل کا نام</label>
            <input
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="جیسے: گندم"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">مقدار (من/40 کلو میں)</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="جیسے: 50"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <div>
            <label className="text-sm text-[#5C4A38] block mb-1">ریٹ فی من (روپے)</label>
            <input
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              type="number"
              placeholder="جیسے: 3200"
              className="w-full bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-3 text-[#2A2118] placeholder-[#5C4A38] focus:outline-none focus:border-[#B5622F]"
            />
          </div>

          <button
            onClick={generateContract}
            disabled={loading}
            className="bg-[#B5622F] text-[#2A2118] font-semibold px-7 py-3 rounded-lg hover:bg-[#8B4A28] transition-colors disabled:opacity-50"
          >
            {loading ? "بن رہا ہے..." : "ایگریمنٹ بنائیں"}
          </button>
        </div>

        {contract && (
          <div className="mt-8 bg-[#EDE3D0] border border-[#B5622F] rounded-lg p-6">
            <p className="text-[#B5622F] text-sm font-medium mb-4">✓ ایگریمنٹ محفوظ ہو گیا</p>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#5C4A38]">ایگریمنٹ نمبر:</span> {contract.contractId}</p>
              <p><span className="text-[#5C4A38]">تاریخ:</span> {contract.createdAt}</p>
              <p><span className="text-[#5C4A38]">فصل:</span> {crop}</p>
              <p><span className="text-[#5C4A38]">مقدار:</span> {quantity} من</p>
              <p><span className="text-[#5C4A38]">ریٹ:</span> {rate} روپے فی من</p>
              <p className="text-[#B5622F] font-semibold text-base pt-2 border-t border-[#2A2118] mt-2">
                کل رقم: {total.toLocaleString()} روپے
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}