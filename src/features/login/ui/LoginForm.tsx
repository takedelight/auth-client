"use client";

import { Button } from "@/src/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/ui/field";
import { Input } from "@/src/shared/ui/input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const router = useRouter();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to login");
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      router.refresh();
      router.push("/");

      toast.success("Login successful");
    },
  });

  return (
    <div>
      <Card className="w-75 sm:w-125">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  value={credentials.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <Button onClick={() => loginMutation.mutate()} type="button">
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="#">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
