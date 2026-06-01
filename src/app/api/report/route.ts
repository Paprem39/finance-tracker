import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

export async function GET() {

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
        {
          status: 401,
        }
      );
    }

    const transactions =
      await prisma.transaction.findMany({

        where: {
          userId:
            session.user.id,
        },

        orderBy: {
          date: "desc",
        },
      });

    return NextResponse.json(
      transactions
    );

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "โหลดข้อมูลไม่สำเร็จ",
      },
      {
        status: 500,
      }
    );
  }
}