import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions =
      await prisma.transaction.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(transactions);

  } catch (error) {

    return NextResponse.json(
      { error: "โหลดข้อมูลไม่สำเร็จ" },
      { status: 500 }
    );
  }
}