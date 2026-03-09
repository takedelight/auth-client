"use client"

import { RegisterFormContext } from "@/context/form.context"
import { use } from "react"

export const useRegisterForm = () => {
  const ctx = use(RegisterFormContext)

  if (!ctx) throw new Error("must be wrapped in provider")

  return ctx
}
