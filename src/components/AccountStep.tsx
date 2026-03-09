import { useRegisterForm } from "@/hooks/useRegisterForm"
import { RiGithubFill, RiGoogleFill } from "@remixicon/react"
import { Button } from "./ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "./ui/field"
import { Input } from "./ui/input"

export const AccountStep = () => {
  const { functions, values } = useRegisterForm()
  return (
    <FieldSet className="animate-in duration-500 slide-in-from-right-10 fade-in">
      <FieldLegend className="mb-8 space-y-1">
        <FieldTitle>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Step 1: Account info
          </h2>
        </FieldTitle>
        <FieldDescription className="text-sm text-muted-foreground/90">
          Input your email address and password to create an account
        </FieldDescription>
      </FieldLegend>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-11 gap-2 font-medium">
          <RiGoogleFill className="size-6" />
          Google
        </Button>
        <Button variant="outline" className="h-11 gap-2 font-medium">
          <RiGithubFill className="size-6" />
          GitHub
        </Button>
      </div>

      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <FieldGroup className="grid gap-5">
        <Field className="flex flex-col gap-1">
          <FieldLabel
            htmlFor="email"
            className="text-sm leading-none font-medium"
          >
            Email address
          </FieldLabel>
          <Input
            id="email"
            value={values.user.email}
            name="email"
            onChange={(e) => functions.setUserData("email", e.target.value)}
            type="email"
            placeholder="john.doe@example.com"
            className="h-11 bg-background transition-all"
          />
        </Field>

        <Field className="flex flex-col gap-1">
          <FieldLabel
            htmlFor="password"
            className="flex justify-between text-sm leading-none font-medium"
          >
            Password
            <a
              className="text-muted-foreground transition-all duration-150 ease-in-out hover:text-black hover:underline"
              href="/forgot-password"
            >
              Forgot your password ?
            </a>
          </FieldLabel>
          <Input
            id="password"
            value={values.user.password}
            name="password"
            onChange={(e) => functions.setUserData("password", e.target.value)}
            type="password"
            placeholder="••••••••"
            className="h-11 bg-background transition-all"
          />
        </Field>

        <Field className="text-center">
          <span>
            {" "}
            Have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </span>
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
