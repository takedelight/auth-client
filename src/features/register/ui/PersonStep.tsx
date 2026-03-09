import { useRegisterForm } from "@/features/register/model/useRegisterForm"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  Input,
} from "@/shared/ui"

export const PersonStep = () => {
  const { functions, values } = useRegisterForm()
  return (
    <>
      <FieldSet className="animate-in duration-500 slide-in-from-right-10 fade-in">
        <FieldLegend className="mb-8 space-y-1">
          <FieldTitle>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Step 2: Person info
            </h2>
          </FieldTitle>
          <FieldDescription>
            <p className="text-sm text-muted-foreground/90">
              Input your personal information
            </p>
          </FieldDescription>
        </FieldLegend>

        <FieldGroup className="grid gap-5">
          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="firstname"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Firstname
            </FieldLabel>
            <Input
              id="firstname"
              value={values.user.firstName}
              name="firstName"
              onChange={(e) =>
                functions.setUserData("firstName", e.target.value)
              }
              type="text"
              placeholder="John"
              className="h-11 bg-background transition-all"
            />
          </Field>

          <Field className="flex flex-col gap-2">
            <FieldLabel
              htmlFor="lastname"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lastname
            </FieldLabel>
            <Input
              id="lastname"
              value={values.user.lastName}
              name="lastName"
              onChange={(e) =>
                functions.setUserData("lastName", e.target.value)
              }
              type="text"
              placeholder="Doe"
              className="h-11 bg-background transition-all"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </>
  )
}
