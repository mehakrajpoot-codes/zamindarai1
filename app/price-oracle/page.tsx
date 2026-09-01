"use client";

import Link from "next/link";

const crops = [
  { name: "گندم", rate: "3,200", unit: "40 کلو", trend: "up" },
  { name: "چاول (باسمتی)", rate: "4,800", unit: "40 کلو", trend: "down" },
  { name: "کپاس", rate: "8,500", unit: "40 کلو", trend: "up" },
  { name: "گنا", rate: "400", unit: "40 کلو", trend: "stable" },
  { name: "مکئی", rate: "2,100", unit: "40 کلو", trend: "up" },
  { name: "آلو", rate: "1,800", unit: "40 کلو", trend: "down" },
];

export default function PriceOracle() {
  return (
    <div className="min-h-screen bg-[#F4EDE0] text-[#2A2118] font-sans" dir="rtl">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#B5622F]">AI</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-[#5C4A38] hover:text-[#2A2118] transition-colors"
        >
          ← واپس
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">پرائس اوریکل</h1>
        <p className="text-[#5C4A38] mb-8">
          آج کی منڈی ریٹس — صحیح دام معلوم کریں، آڑتی سے دھوکا نہ کھائیں۔
        </p>

        <div className="space-y-3">
          {crops.map((crop) => (
            <div
              key={crop.name}
              className="flex items-center justify-between bg-[#EDE3D0] border border-[#2A2118] rounded-lg p-5"
            >
              <div>
                <p className="font-medium">{crop.name}</p>
                <p className="text-sm text-[#5C4A38]">فی {crop.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-[#B5622F]">
                  Rs {crop.rate}
                </p>
                <p className="text-xs text-[#5C4A38]">
                  {crop.trend === "up" && "▲ بڑھ رہا ہے"}
                  {crop.trend === "down" && "▼ گر رہا ہے"}
                  {crop.trend === "stable" && "● مستحکم"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[#5C4A38] text-center">
          ریٹس تقریباً آج کی منڈی کے مطابق ہیں۔ ڈیمو ڈیٹا۔
        </p>
      </main>
    </div>
  );
}