import { RegisterCard } from "@/components/RegisterCard"
import { RegisterFormProvider } from "@/providers/RegisterFormProvider"

export const HomePage = () => {
  return (
    <section className="container mx-auto flex h-screen items-center justify-center px-4">
      <RegisterFormProvider>
        <RegisterCard />
      </RegisterFormProvider>
    </section>
  )
}
