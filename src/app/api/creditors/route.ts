import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

// =======================
// GET
// =======================
export async function GET() {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {
      return NextResponse.json([]);
    }

    const creditors =
      await prisma.creditor.findMany({
        where: {
          userId:
            session.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json(
      creditors
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "โหลดข้อมูลเจ้าหนี้ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}

// =======================
// POST
// =======================
export async function POST(
  req: Request
) {
  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {

      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body =
      await req.json();

    const {
      name,
      amount,
    } = body;

    if (
      !name ||
      !amount
    ) {

      return NextResponse.json(
        {
          error:
            "ข้อมูลไม่ครบ",
        },
        { status: 400 }
      );
    }

    const creditor =
      await prisma.creditor.create({
        data: {
          name,

          amount:
            Number(amount),

          userId:
            session.user.id,
        },
      });

    return NextResponse.json(
      creditor
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "สร้างเจ้าหนี้ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}