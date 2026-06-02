import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

// =======================
// GET
// =======================
export async function GET(
  req: Request
) {

  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.id) {

      return NextResponse.json([]);
    }

    const { searchParams } =
      new URL(req.url);

    const filterType =
      searchParams.get("filterType");

    const selectedMonth =
      searchParams.get("selectedMonth");

    const selectedYear =
      searchParams.get("selectedYear");

    const startDate =
      searchParams.get("startDate");

    const endDate =
      searchParams.get("endDate");

    // =======================
    // Budgets
    // =======================
    const budgets =
      await prisma.budget.findMany({

        where: {
          userId:
            session.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    // =======================
    // Transactions
    // =======================
    const transactions =
      await prisma.transaction.findMany({

        where: {
          userId:
            session.user.id,

          type: "expense",
        },
      });

    // =======================
    // Calculate used
    // =======================
    const budgetsWithUsed =
      budgets.map((budget) => {

        let filtered =
          transactions.filter(
            (t) =>
              t.category ===
              budget.category
          );

        // monthly
        if (
          filterType === "monthly" &&
          selectedMonth
        ) {

          filtered = filtered.filter(
            (t) => {

              const month =
                new Date(t.date)
                  .toISOString()
                  .slice(0, 7);

              return (
                month ===
                selectedMonth
              );
            }
          );
        }

        // yearly
        if (
          filterType === "yearly" &&
          selectedYear
        ) {

          filtered = filtered.filter(
            (t) => {

              const year =
                new Date(t.date)
                  .getFullYear()
                  .toString();

              return (
                year ===
                selectedYear
              );
            }
          );
        }

        // daily
        if (
          filterType === "daily" &&
          startDate &&
          endDate
        ) {

          filtered = filtered.filter(
            (t) => {

              const date =
                new Date(t.date);

              return (
                date >=
                  new Date(startDate) &&
                date <=
                  new Date(endDate)
              );
            }
          );
        }

        const used =
          filtered.reduce(
            (sum, t) =>
              sum + t.amount,
            0
          );

        return {
          ...budget,
          used,
        };
      });

    return NextResponse.json(
      budgetsWithUsed
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "โหลด Budget ไม่สำเร็จ",
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
      category,
      limit,
    } = body;

    if (
      !category ||
      !limit
    ) {

      return NextResponse.json(
        {
          error:
            "ข้อมูลไม่ครบ",
        },
        { status: 400 }
      );
    }

    const budget =
      await prisma.budget.create({

        data: {

          category,

          limit:
            Number(limit),

          userId:
            session.user.id,
        },
      });

      return NextResponse.json(
        budget
      );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "สร้าง Budget ไม่สำเร็จ",
      },
      { status: 500 }
    );
  }
}