import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return NextResponse.json(
        { error: "Sab fields zaroori hain." },
        { status: 400 }
      );
    }

    const farmer = await prisma.farmer.findUnique({ where: { phone } });
    if (!farmer) {
      return NextResponse.json(
        { error: "Phone number ya password ghalat hai." },
        { status: 400 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, farmer.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Phone number ya password ghalat hai." },
        { status: 400 }
      );
    }

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
      { error: "Login nahi ho saka." },
      { status: 500 }
    );
  }
}