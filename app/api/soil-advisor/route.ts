import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { soilType, crop } = body;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `Aap ek Pakistani zirat (agriculture) ka mitti aur khaad ka maahir hain.
Farmer ki mitti: "${soilType}"
Farmer ki fasal: "${crop}"

Sirf Roman Urdu mein jawab dein (English alfaaz na likhein). Jawab mein ye shamil karein:
1. Is mitti ke liye behtareen khaad (fertilizer) ka mashwara
2. Paani dene ka tareeqa (kitni dair baad, kitna paani)
3. Is mitti/fasal ke combination ke liye ehtiyati tadabeer

Jawab chota aur seedha rakhein, zyada lamba na karein.`,
    });

    return NextResponse.json({ answer: response.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Kuch masla ho gaya, dobara koshish karein." },
      { status: 500 }
    );
  }
}