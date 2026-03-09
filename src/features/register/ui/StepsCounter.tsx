import type { Steps } from "@/features/register/model/form.context"
import { useRegisterForm } from "@/features/register/model/useRegisterForm"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui"
export const StepsCounter = () => {
  const { functions, values } = useRegisterForm()

  const isStep1Valid = values.user.email !== "" && values.user.password !== ""
  const isStep2Valid =
    values.user.firstName !== "" && values.user.lastName !== ""

  const steps = [
    { id: 1, label: "Account info" },
    { id: 2, label: "Person info" },
    { id: 3, label: "Finish" },
  ]

  return (
    <div className="flex w-full items-center justify-center px-4">
      {steps.map((step, index) => {
        const isCompleted = values.step > step.id
        const isActive = values.step === step.id

        const isDisabled =
          (step.id === 2 && !isStep1Valid) ||
          (step.id === 3 && (!isStep1Valid || !isStep2Valid))

        return (
          <div
            key={step.id}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="relative flex flex-col items-center">
              <Button
                type="button"
                disabled={isDisabled}
                onClick={() => functions.goToStep(step.id as Steps)}
                variant="outline"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold transition-all",
                  isActive &&
                    "border-primary bg-primary text-white hover:bg-primary/90 hover:text-white",
                  isCompleted &&
                    "bg-primary text-white hover:bg-primary hover:text-white",
                  !isActive &&
                    !isCompleted &&
                    "border-transparent bg-neutral-100 text-muted-foreground",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                {step.id}
              </Button>

              <span
                className={cn(
                  "absolute top-12 left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap",
                  isActive ? "text-foreground" : "text-muted-foreground",
                  isDisabled && "opacity-40"
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 h-1 flex-1 rounded-full bg-primary/20">
                <span
                  className={cn(
                    "block h-full bg-primary transition-all duration-500",
                    isCompleted ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
