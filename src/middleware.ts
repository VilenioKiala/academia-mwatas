// import { NextRequest, NextResponse } from "next/server";
// import { decrypt, getUser } from "./app/lib/session";
export { auth as middleware } from "@/app/auth";

// export async function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/signin")) {
//     if (request.method.toLowerCase() == "get") {
//       if (request.cookies.has("session")) {
//         const session = await decrypt(request.cookies.get("session").value);
//         if (!session?.userId) {
//           return null;
//         }

//         return NextResponse.redirect(
//           new URL("/plataforma/conteudos", request.url)
//         );
//       }
//     }
//   }

// if (request.nextUrl.pathname.startsWith("/plataforma/")) {
//   if (request.cookies.has("session")) {
//     await getUser();

//     return null;
//   }
// }
// }
