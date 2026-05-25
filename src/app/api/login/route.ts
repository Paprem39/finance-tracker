import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { loginInput, password } = body;

    // หา user จาก email หรือ username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: loginInput },
          { username: loginInput },
        ],
      },
    });

    // ถ้าไม่มี user
    if (!user) {
      return NextResponse.json(
        {
          message: "ไม่พบผู้ใช้งาน",
        },
        {
          status: 401,
        }
      );
    }

    // เช็ก password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // password ไม่ถูก
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Password ไม่ถูกต้อง",
        },
        {
          status: 401,
        }
      );
    }

    // login สำเร็จ
    return NextResponse.json({
      message: "Login สำเร็จ 🎉",
      user: {
        id: user.id,
        nickname: user.nickname,
        username: user.username,
      },
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "เกิดข้อผิดพลาด",
      },
      {
        status: 500,
      }
    );
  }
}