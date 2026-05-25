import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nickname,
      firstname,
      lastname,
      email,
      username,
      password,
    } = body;

    // เช็ค user ซ้ำ
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingUser) {
      return Response.json(
        {
          error: "Email หรือ Username ถูกใช้งานแล้ว",
        },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        nickname,
        firstname,
        lastname,
        email,
        username,
        password: hashedPassword,
      },
    });

    return Response.json({
      message: "สมัครสมาชิกสำเร็จ",
      user,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "เกิดข้อผิดพลาด",
      },
      { status: 500 }
    );
  }
}