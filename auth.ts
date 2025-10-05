import NextAuth from "next-auth";
import Crediantials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { error } from "console";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (err) {
    console.log("Failed to fetch user: ", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [],
});
