"use client"

import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"
import {
  RiCheckLine,
  RiLockPasswordLine,
  RiShieldKeyholeLine,
  RiUserSharedLine,
} from "@remixicon/react"
import { useRegisterForm } from "../model/useRegisterForm"

const AUTH_TYPES = [
  {
    id: "jwt",
    title: "JWT Token",
    description: "Best for mobile and modern web apps",
    icon: RiShieldKeyholeLine,
  },
  {
    id: "session",
    title: "Server Session",
    description: "Classic approach with secure cookies",
    icon: RiUserSharedLine,
  },
  {
    id: "basic",
    title: "Basic Auth",
    description: "Simple but less secure credentials",
    icon: RiLockPasswordLine,
  },
]

export const AuthTypeStep = () => {
  const { functions, values } = useRegisterForm()

  return (
    <div className="animate-in space-y-4 duration-500 fade-in">
      <h2 className="text-xl font-bold text-foreground">Select Auth Type</h2>

      <div className="flex flex-col gap-3">
        {AUTH_TYPES.map((type) => {
          const isActive = values.user.authType === type.id

          return (
            <Button
              type="button"
              key={type.id}
              variant="outline"
              onClick={() => functions.setUserData("authType", type.id)}
              className={cn(
                "relative flex h-auto w-full items-center justify-start gap-4 rounded-xl border-2 p-4 transition-all duration-200",
                isActive
                  ? "border-primary bg-primary/5 shadow-sm hover:border-primary hover:bg-primary/5"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground"
                )}
              >
                <type.icon className="size-6" />
              </div>

              <div className="min-w-0 flex-1 overflow-hidden text-left">
                <p
                  className={cn(
                    "truncate font-semibold transition-colors",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                >
                  {type.title}
                </p>
                <p className="truncate text-sm font-normal text-muted-foreground">
                  {type.description}
                </p>
              </div>

              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isActive
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/20 bg-transparent"
                )}
              >
                {isActive && <RiCheckLine className="size-4 text-white" />}
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
