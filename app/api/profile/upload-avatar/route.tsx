import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const formData = await req.formData();

  const sidValue = req.cookies.get("sid")?.value;

  const response = await fetch(`${process.env.API_URL}/user/avatar`, {
    method: "PATCH",
    headers: {
      Cookie: `sid=${sidValue}`,
    },
    body: formData,
  });

  console.log(response);

  const res = NextResponse.json({ ok: true });

  return res;
}
