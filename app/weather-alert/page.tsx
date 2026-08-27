"use client";

import { useState } from "react";
import Link from "next/link";

const cities = [
  { name: "Lahore", lat: 31.5497, lon: 74.3436 },
  { name: "Faisalabad", lat: 31.4504, lon: 73.135 },
  { name: "Multan", lat: 30.1575, lon: 71.5249 },
  { name: "Rahim Yar Khan", lat: 28.4202, lon: 70.2952 },
  { name: "Sahiwal", lat: 30.6682, lon: 73.1114 },
  { name: "Bahawalpur", lat: 29.3956, lon: 71.6836 },
];

export default function WeatherAlert() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weather, setWeather] = useState<null | {
    temp: number;
    rainChance: number;
    windSpeed: number;
  }>(null);
  const [loading, setLoading] = useState(false);

  async function checkWeather() {
    setLoading(true);
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,precipitation_probability,wind_speed_10m`
      );
      const data = await res.json();
      setWeather({
        temp: data.current.temperature_2m,
        rainChance: data.current.precipitation_probability ?? 0,
        windSpeed: data.current.wind_speed_10m,
      });
    } catch (err) {
      alert("Mausam ka data nahi mil saka, dobara koshish karein.");
    } finally {
      setLoading(false);
    }
  }

  function getAdvice() {
    if (!weather) return null;
    const tips: string[] = [];

    if (weather.rainChance > 50) {
      tips.push("Barish ka zyada imkaan hai — sprai ya khaad dalne se bachein.");
    } else {
      tips.push("Barish ka imkaan kam hai — sprai karne ke liye theek waqt hai.");
    }

    if (weather.temp > 35) {
      tips.push("Garmi zyada hai — fasal ko zyada paani dein, khaas kar sham ke waqt.");
    } else if (weather.temp < 10) {
      tips.push("Sardi ka khatra — nazuk paudon ko dhaank kar rakhein.");
    }

    if (weather.windSpeed > 25) {
      tips.push("Hawa tez hai — abhi sprai na karein, dawa uD jayegi.");
    }

    return tips;
  }

  return (
    <div className="min-h-screen bg-[#0F1C15] text-[#F5F1E8] font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Zamindar<span className="text-[#8FBC6A]">AI</span>
        </Link>
        <Link href="/" className="text-sm text-[#A8B5A0] hover:text-[#F5F1E8] transition-colors">
          ← Wapis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Weather Alert</h1>
        <p className="text-[#A8B5A0] mb-8">
          Mausam dekh kar fasal ki hifazat ke mashware payein.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-[#A8B5A0] block mb-1">Apna shehar chunein</label>
            <select
              value={selectedCity.name}
              onChange={(e) =>
                setSelectedCity(cities.find((c) => c.name === e.target.value) || cities[0])
              }
              className="w-full bg-[#16241A] border border-[#2A3B2A] rounded-lg p-3 text-[#F5F1E8] focus:outline-none focus:border-[#8FBC6A]"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={checkWeather}
            disabled={loading}
            className="bg-[#8FBC6A] text-[#0F1C15] font-semibold px-7 py-3 rounded-lg hover:bg-[#7DA85C] transition-colors disabled:opacity-50"
          >
            {loading ? "Mausam check ho raha hai..." : "Mausam Dekhein"}
          </button>
        </div>

        {weather && (
          <div className="mt-8 space-y-4">
            <div className="bg-[#16241A] border border-[#2A3B2A] rounded-lg p-6">
              <p className="text-[#8FBC6A] text-sm font-medium mb-4">
                {selectedCity.name} ka mausam
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{weather.temp}°C</p>
                  <p className="text-xs text-[#A8B5A0]">Temperature</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{weather.rainChance}%</p>
                  <p className="text-xs text-[#A8B5A0]">Barish ka chance</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{weather.windSpeed}</p>
                  <p className="text-xs text-[#A8B5A0]">Hawa (km/h)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#16241A] border border-[#8FBC6A] rounded-lg p-6">
              <p className="text-[#8FBC6A] text-sm font-medium mb-3">Mashware</p>
              <ul className="space-y-2 text-sm">
                {getAdvice()?.map((tip, i) => (
                  <li key={i} className="text-[#F5F1E8]">• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}