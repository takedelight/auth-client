import { useRegisterForm } from "@/features/register/model/useRegisterForm"
import { Button, Card, CardContent, CardFooter, CardHeader } from "@/shared/ui"
import { AccountStep } from "./AccountStep"
import { AuthTypeStep } from "./AuthTypeStep"
import { FinishStep } from "./FinishStep"
import { PersonStep } from "./PersonStep"
import { StepsCounter } from "./StepsCounter"

export const RegisterCard = () => {
  const { functions, values } = useRegisterForm()

  const STEPS = [AuthTypeStep, AccountStep, PersonStep, FinishStep]

  const isAuthTypeDisabled = values.step === 1 && !values.user.authType

  const isAccountStepDisabled =
    values.step === 2 &&
    (values.user.email === "" || values.user.password === "")

  const isPersonStepDisabled =
    values.step === 3 &&
    (values.user.firstName === "" || values.user.lastName === "")

  const Step = STEPS[values.step - 1]
  return (
    <Card className="w-150 py-0">
      <CardHeader className="bg-muted/50 px-4 py-10">
        <StepsCounter />
      </CardHeader>

      <CardContent className="min-h-60">
        <form action="">
          <Step />
        </form>
      </CardContent>

      <CardFooter className="justify-end">
        <div className="flex items-center gap-2">
          <Button
            disabled={values.step === 1}
            onClick={functions.prev}
            size="lg"
            className="px-8"
          >
            Prev
          </Button>

          {values.step < 4 ? (
            <Button
              disabled={
                isAuthTypeDisabled ||
                values.step === STEPS.length ||
                isAccountStepDisabled ||
                isPersonStepDisabled
              }
              onClick={functions.next}
              size="lg"
              className="px-8"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => console.log(values.user)}
              size="lg"
              className="px-8"
            >
              Register
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
