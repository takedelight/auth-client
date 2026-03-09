import { RegisterCard } from "@/features/register/ui/RegisterCard"
import { RegisterFormProvider } from "@/features/register/model/RegisterFormProvider"

export const HomePage = () => {
  return (
    <section className="container mx-auto flex h-screen items-center justify-center px-4">
      <RegisterFormProvider>
        <RegisterCard />
      </RegisterFormProvider>
    </section>
  )
}
