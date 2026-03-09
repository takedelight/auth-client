import { useRegisterForm } from "@/hooks/useRegisterForm"
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

export const FinishStep = () => {
  const { values, functions } = useRegisterForm()

  return (
    <>
      {" "}
      <FieldSet className="animate-in duration-500 slide-in-from-right-10 fade-in">
        <FieldLegend className="mb-8 space-y-1">
          <FieldTitle>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Step 3: Finish Step
            </h2>
          </FieldTitle>
          <FieldDescription>
            <p className="text-sm text-muted-foreground/90">
              Check your information and submit the form to complete the
              process.
            </p>
          </FieldDescription>
        </FieldLegend>

        <FieldGroup className="grid gap-5">
          <Field className="flex flex-col gap-1">
            <FieldLabel
              htmlFor="email"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </FieldLabel>
            <Input
              value={values.user.email}
              onChange={(e) => functions.setUserData("email", e.target.value)}
              id="email"
              type="email"
              placeholder="john@example.com"
              className="h-11 bg-background transition-all"
            />
          </Field>

          <Field className="flex flex-col gap-1">
            <FieldLabel
              htmlFor="password"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </FieldLabel>
            <Input
              value={values.user.password}
              onChange={(e) =>
                functions.setUserData("password", e.target.value)
              }
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 bg-background transition-all"
            />
          </Field>

          <div className="flex items-center gap-4">
            <Field className="flex flex-col gap-1">
              <FieldLabel
                htmlFor="firstname"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Firstname
              </FieldLabel>
              <Input
                id="firstname"
                value={values.user.firstName}
                onChange={(e) =>
                  functions.setUserData("firstName", e.target.value)
                }
                type="text"
                placeholder="John"
                className="h-11 bg-background transition-all"
              />
            </Field>

            <Field className="flex flex-col gap-1">
              <FieldLabel
                htmlFor="lastname"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lastname
              </FieldLabel>
              <Input
                id="lastname"
                value={values.user.lastName}
                onChange={(e) =>
                  functions.setUserData("lastName", e.target.value)
                }
                type="text"
                placeholder="Doe"
                className="h-11 bg-background transition-all"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </>
  )
}
