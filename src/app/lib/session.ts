"use server";

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { redirect, RedirectType } from "next/navigation";
import { getOneUserService } from "../(backend)/services/user/GetOneUser";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// export async function encrypt(payload: JWTPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);
// }

export async function decrypt(session: string | undefined = "") {
  console.log(secretKey);
  console.log("session", session);
  console.log("Ficheiro session", session);
  console.log("encoded: ", encodedKey);

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log(`Failed to verify session: ${error}`);
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  console.log("sessão criada com sucesso!");
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();

  return cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/signin");
  }

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();

  if (!session) {
    return null;
  }

  // try {
  const user = await getOneUserService.get(<string>session.userId);

  if (!user) {
    await deleteSession();
    redirect("/signin", RedirectType.replace);
  }

  return user;
  // } catch (error: unknown) {
  //   console.log("Failed to fetch user: ", error);
  //   return null;
  // }
});

export const verifySessionWithoutRedirect = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  const session = await decrypt(cookie);

  if (!session?.userId) {
    return false;
  }

  const user = await getOneUserService.get(<string>session.userId);

  if (!user) {
    return false;
  }

  return { isAuth: true, userId: session.userId };
});
