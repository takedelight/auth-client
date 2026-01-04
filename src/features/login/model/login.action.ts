"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) {
    throw new Error("No Set-Cookie from backend");
  }

  const [cookiePair] = setCookie.split(";");
  const [name, value] = cookiePair.split("=");

  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/");
}
