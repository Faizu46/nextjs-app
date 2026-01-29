import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";

// Create the NextAuth handler using the imported authOptions
const handler = NextAuth(authOptions);

// Export only GET and POST for App Router
export { handler as GET, handler as POST };
