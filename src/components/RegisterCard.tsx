import { useRegisterForm } from "@/hooks/useRegisterForm"
import { AccountStep } from "./AccountStep"
import { FinishStep } from "./FinishStep"
import { PersonStep } from "./PersonStep"
import { StepsCounter } from "./StepsCounter"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export const RegisterCard = () => {
  const { functions, values } = useRegisterForm()

  const STEPS = [AccountStep, PersonStep, FinishStep]

  const isAccountStepDisabled =
    values.step === 1 &&
    (values.user.email === "" || values.user.password === "")

  const isPersonStepDisabled =
    values.step === 2 &&
    (values.user.firstName === "" || values.user.lastName === "")

  const handleStep = async () => {
    if (isAccountStepDisabled) return

    if (values.step === 1) {
      const res = await fetch(
        `http://localhost:5000/user/email-is-taken/${values.user.email}`
      )

      const data = await res.json()

      if (res.status === 409) {
        console.error(data.message)
        return
      }
    }

    functions.next()
  }

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

          <Button
            disabled={
              values.step === STEPS.length ||
              isAccountStepDisabled ||
              isPersonStepDisabled
            }
            onClick={handleStep}
            size="lg"
            className="px-8"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
