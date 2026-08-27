import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, password } = body;

    if (!name || !phone || !password) {
      return NextResponse.json(
        { error: "Sab fields zaroori hain." },
        { status: 400 }
      );
    }

    const existing = await prisma.farmer.findUnique({ where: { phone } });
    if (existing) {
      return NextResponse.json(
        { error: "Ye phone number pehle se registered hai." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const farmer = await prisma.farmer.create({
      data: { name, phone, password: hashedPassword },
    });

    const response = NextResponse.json({ success: true, farmerId: farmer.id });
    response.cookies.set("farmerId", String(farmer.id), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Account nahi ban saka." },
      { status: 500 }
    );
  }
}