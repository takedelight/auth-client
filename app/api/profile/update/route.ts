import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { firstName, lastName } = await req.json();

  console.log(firstName, lastName);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: req.headers.get("cookie") ?? "",
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Backend update failed" },
      { status: res.status },
    );
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
