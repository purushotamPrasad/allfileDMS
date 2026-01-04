import NextAuth from "next-auth/next";
import { authOptions } from "@/utils/Auth/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
