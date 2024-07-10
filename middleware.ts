import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  console.log(cookies());
  const session = await getSession();
  console.log(session);

  if (request.nextUrl.pathname === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
}
