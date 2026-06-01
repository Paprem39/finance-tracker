import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.transaction.delete({

      where: {
        id,
        userId: session.user.id,
      },

    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error: "ลบไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}