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
    params: {
      id: string;
    };
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
      category,
      limit,
    } = body;

    const updatedBudget =
      await prisma.budget.update({

        where: {
          id: Number(params.id),
        },

        data: {

          category,

          limit:
            Number(limit),
        },
      });

    return NextResponse.json(
      updatedBudget
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "แก้ไข Budget ไม่สำเร็จ",
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
    params: {
      id: string;
    };
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

    await prisma.budget.delete({

      where: {
        id: Number(params.id),
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
          "ลบ Budget ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}