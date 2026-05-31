import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

import { prisma } from "@/lib/prisma";

export async function GET() {

  try {

    const session =
      await getServerSession(authOptions);

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

    const user =
      await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },

        select: {
          nickname: true,
          firstname: true,
          lastname: true,
          email: true,
          username: true,
          createdAt: true,
        },
      });

    return NextResponse.json(user);

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