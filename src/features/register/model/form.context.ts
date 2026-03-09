import { createContext } from "react"

export type Steps = 1 | 2 | 3 | 4

export interface UserData {
  email: string
  password: string
  firstName: string
  lastName: string
  authType: string
}

interface RegisterFormContext {
  values: {
    step: Steps
    user: UserData
  }

  functions: {
    setUserData: (key: keyof UserData, value: string) => void
    next: () => void
    prev: () => void
    goToStep: (step: Steps) => void
  }
}

export const RegisterFormContext = createContext<RegisterFormContext | null>(
  null
)
