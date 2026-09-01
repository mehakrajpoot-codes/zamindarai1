import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fallbackCalendars: Record<string, string> = {
  "گندم": "1. بوائی: نومبر کے وسط سے دسمبر کے شروع تک\n2. پہلا پانی: بوائی کے 20-25 دن بعد\n3. کھاد: بوائی کے وقت اور پہلے پانی کے بعد یوریا ڈالیں\n4. کٹائی: اپریل کے وسط سے مئی تک",
  "چاول": "1. نرسری: مئی کے شروع میں\n2. پنیری کی منتقلی: جون کے وسط میں\n3. کھاد اور پانی: باقاعدگی سے کھڑا پانی رکھیں\n4. کٹائی: اکتوبر سے نومبر تک",
  "کپاس": "1. بوائی: اپریل سے مئی کے شروع تک\n2. پہلا پانی: بوائی کے 3-4 ہفتے بعد\n3. کھاد: نائٹروجن اور فاسفورس بوائی پر، باقی بعد میں\n4. چنائی: ستمبر سے نومبر تک، کئی مراحل میں",
  "گنا": "1. بوائی: فروری-مارچ یا ستمبر-اکتوبر\n2. پانی: ہر 10-15 دن بعد گرمی میں\n3. کھاد: نائٹروجن، فاسفورس، پوٹاش تین مراحل میں\n4. کٹائی: بوائی کے 10-12 ماہ بعد",
  "مکئی": "1. بوائی: فروری-مارچ (بہار) یا جولائی (خزاں)\n2. پہلا پانی: بوائی کے فوراً بعد\n3. کھاد: بوائی پر اور 25-30 دن بعد\n4. کٹائی: بوائی کے 90-110 دن بعد",
  "آلو": "1. بوائی: اکتوبر-نومبر (خزاں) یا جنوری-فروری (بہار)\n2. پانی: ہلکا اور باقاعدہ پانی\n3. کھاد: بوائی پر مکمل خوراک دیں\n4. کھدائی: بوائی کے 90-100 دن بعد",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { crop } = body;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: `Aap ek Pakistani zirat (agriculture) ka maahir hain.
Farmer ne "${crop}" fasal ke liye calendar poocha hai (Pakistan/Punjab ke mausam ke hisaab se).

Sirf Urdu script mein jawab dein. Jawab mein ye shamil karein, numbered points mein:
1. بوائی کا بہترین وقت
2. اہم مراحل (کھاد، پانی کا شیڈول)
3. کٹائی کا وقت

Chota aur seedha rakhein.`,
      });

      return NextResponse.json({ answer: response.text });
    } catch (aiError) {
      const fallback = fallbackCalendars[crop];
      if (fallback) {
        return NextResponse.json({ answer: fallback });
      }
      throw aiError;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "کچھ مسئلہ ہو گیا، دوبارہ کوشش کریں۔" },
      { status: 500 }
    );
  }
}