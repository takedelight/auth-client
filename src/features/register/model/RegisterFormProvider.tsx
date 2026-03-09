"use client"

import {
  RegisterFormContext,
  type Steps,
  type UserData,
} from "@/features/register/model/form.context"
import { useState, type PropsWithChildren } from "react"

export const RegisterFormProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<Steps>(1)
  const [user, setUser] = useState<UserData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const setUserData = (key: keyof UserData, value: string) => {
    setUser((p) => ({ ...p, [key]: value }))
  }

  const next = () => {
    setStep((p) => (p + 1) as Steps)
  }
  const prev = () => {
    setStep((p) => (p - 1) as Steps)
  }

  const goToStep = (step: Steps) => {
    setStep(step)
  }

  const values = {
    values: {
      step,
      user,
    },
    functions: {
      next,
      prev,
      goToStep,
      setUserData,
    },
  }

  return <RegisterFormContext value={values}>{children}</RegisterFormContext>
}
