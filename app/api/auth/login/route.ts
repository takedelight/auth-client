import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const userAgent = req.headers.get("user-agent");

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, userAgent }),
  });

  const setCokkie = response.headers.get("Set-Cookie");

  const res = NextResponse.json({ ok: true });

  if (setCokkie) {
    res.headers.set("set-cookie", setCokkie);
  }

  return res;
}
