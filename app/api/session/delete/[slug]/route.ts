import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const token = req.cookies.get("sid")?.value;

  const res = await fetch(`${process.env.API_URL}/session/delete/${slug}`, {
    method: "DELETE",
    headers: {
      Cookie: `sid=${token}`,
    },
  });

  return NextResponse.json(res.json());
}
