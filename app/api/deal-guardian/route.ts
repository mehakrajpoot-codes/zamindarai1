import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const farmerId = request.cookies.get("farmerId")?.value;

    if (!farmerId) {
      return NextResponse.json(
        { error: "Pehle login karein." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { crop, quantity, rate } = body;

    const contractId = "ZAI-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const total = Number(quantity) * Number(rate);

    const contract = await prisma.contract.create({
      data: {
        contractId,
        crop,
        quantity: Number(quantity),
        rate: Number(rate),
        total,
        farmerId: Number(farmerId),
      },
    });

    return NextResponse.json({ contract });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Contract save nahi ho saka." },
      { status: 500 }
    );
  }
}