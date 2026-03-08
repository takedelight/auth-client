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
  return (
    <FieldSet className="animate-in duration-500 slide-in-from-top-10 fade-in">
      <FieldLegend className="mb-8 space-y-1">
        <FieldTitle>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Step 1: Account info
          </h2>
        </FieldTitle>
        <FieldDescription>
          <p className="text-sm text-muted-foreground/90">
            Input your email address and password to create an account
          </p>
        </FieldDescription>
      </FieldLegend>

      {/* Кнопки oAuth */}
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
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="email"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email address
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            className="h-11 bg-background transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </Field>

        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="password"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="h-11 bg-background transition-all focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}
