"use client";

import Link from "next/link";

const crops = [
  { name: "Gandum (Wheat)", rate: "3,200", unit: "40 kg", trend: "up" },
  { name: "Chawal (Rice) - Basmati", rate: "4,800", unit: "40 kg", trend: "down" },
  { name: "Kapas (Cotton)", rate: "8,500", unit: "40 kg", trend: "up" },
  { name: "Ganna (Sugarcane)", rate: "400", unit: "40 kg", trend: "stable" },
  { name: "Makai (Corn)", rate: "2,100", unit: "40 kg", trend: "up" },
  { name: "Aloo (Potato)", rate: "1,800", unit: "40 kg", trend: "down" },
];

export default function PriceOracle() {
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
        <h1 className="text-3xl font-bold mb-2">Price Oracle</h1>
        <p className="text-[#A8B5A0] mb-8">
          Aaj ki mandi rates — sahi daam maloom karein, aarti se dhoka na khayein.
        </p>

        <div className="space-y-3">
          {crops.map((crop) => (
            <div
              key={crop.name}
              className="flex items-center justify-between bg-[#16241A] border border-[#2A3B2A] rounded-lg p-5"
            >
              <div>
                <p className="font-medium">{crop.name}</p>
                <p className="text-sm text-[#A8B5A0]">fi {crop.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-[#8FBC6A]">
                  Rs {crop.rate}
                </p>
                <p className="text-xs text-[#A8B5A0]">
                  {crop.trend === "up" && "▲ Barh raha hai"}
                  {crop.trend === "down" && "▼ Gir raha hai"}
                  {crop.trend === "stable" && "● Mustahkam"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[#5A6B55] text-center">
          Rates roughly aaj ki mandi ke mutabiq hain. Demo data.
        </p>
      </main>
    </div>
  );
}