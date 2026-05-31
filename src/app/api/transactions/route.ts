import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession }from "next-auth";

import { authOptions }from "../auth/[...nextauth]/route";


// GET
export async function GET() {

  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {

      return NextResponse.json(
        [],
      );
    }

    const transactions =
      await prisma.transaction.findMany({

        where: {
          userId:
            session.user.id,
        },

        orderBy: {
          createdAt: "desc",
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
      { status: 500 }
    );
  }
}


// POST
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

    const body = await req.json();

    const transactions =
      body.transactions;

    if (
      !transactions ||
      transactions.length === 0
    ) {

      return NextResponse.json(
        {
          error: "ไม่มีข้อมูล",
        },
        { status: 400 }
      );
    }

    const dataWithUser =
      transactions.map(
        (item: any) => ({

          ...item,

          date: new Date(item.date),

          userId:
            session.user.id,
        })
      );

    const created =
      await prisma.transaction.createMany({
        data: dataWithUser,
      });

    return NextResponse.json(
      created
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "บันทึกไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}