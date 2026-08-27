import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const question = body.question;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Aap ek Pakistani zirat (agriculture) ka maahir hain jo kisanon ki madad karte hain.
Farmer ne apni fasal ki ye problem batai hai: "${question}"

Sirf Roman Urdu mein jawab dein (English alfaaz na likhein). Jawab mein ye shamil karein:
1. Mumkina bimari ka naam
2. Ilaj/treatment
3. Ehtiyati tadabeer (precautions)

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