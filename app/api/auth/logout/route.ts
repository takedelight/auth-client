import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sidValue = req.cookies.get("sid")?.value;

  console.log(sidValue);

  const response = await fetch(`${process.env.API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Cookie: `sid=${sidValue}`,
    },
  });

  const setCookie = response.headers.get("Set-Cookie");

  const nextResponse = NextResponse.redirect(new URL("/", req.url));

  if (setCookie) {
    nextResponse.headers.set("Set-Cookie", setCookie);
  }

  return nextResponse;
}
