import NextAuth, {NextAuthOptions,} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions:
  NextAuthOptions = {

  providers: [

    CredentialsProvider({

      name: "credentials",

      credentials: {
        loginInput: {},
        password: {},
      },

      async authorize(credentials) {

        if (
          !credentials?.loginInput ||
          !credentials?.password
        ) {
          return null;
        }

        const user =
          await prisma.user.findFirst({
            where: {
              OR: [
                {
                  email:
                    credentials.loginInput,
                },
                {
                  username:
                    credentials.loginInput,
                },
              ],
            },
          });

        if (!user) {
          return null;
        }

        const isValid =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {

    async jwt({
      token,
      user,
    }) {

      if (user) {
        token.id = user.id;
        token.nickname =
          user.nickname;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {

      if (session.user) {

        session.user.id =
          token.id as string;

        session.user.nickname =
          token.nickname as string;
      }

      return session;
    },
  },
};

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};