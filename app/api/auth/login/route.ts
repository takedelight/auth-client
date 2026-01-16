import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userAgent = req.headers.get("user-agent") || "";

  const backendResponse = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, userAgent }),
  });

  const data = await backendResponse.json();

  const res = NextResponse.json(data, { status: backendResponse.status });

  const setCookieHeader = backendResponse.headers.get("set-cookie");

  if (setCookieHeader) {
    res.headers.set("set-cookie", setCookieHeader);
  }

  return res;
}
