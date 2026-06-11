import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

// =======================
// PUT
// =======================
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
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

    const { id } =
      await params;

    const result =
      await prisma.creditor.updateMany({
        where: {
          id: Number(id),

          userId:
            session.user.id,
        },

        data: {
          ...(name !== undefined && {
            name,
          }),
        
          ...(amount !== undefined && {
            amount: Number(amount),
          }),
        },
      });

    if (
      result.count === 0
    ) {

      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "แก้ไขเจ้าหนี้ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE
// =======================
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  try {

    const { id } =
      await params;

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

    const creditor =
      await prisma.creditor.findUnique({
        where: {
          id: Number(id),
        },
      });

    if (
      !creditor ||
      creditor.userId !==
        session.user.id
    ) {

      return NextResponse.json(
        {
          error:
            "Forbidden",
        },
        { status: 403 }
      );
    }

    await prisma.creditor.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "ลบเจ้าหนี้ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}