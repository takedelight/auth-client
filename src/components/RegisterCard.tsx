import { FinishStep } from "./FinishStep"
import { StepsCounter } from "./StepsCounter"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

export const RegisterCard = () => {
  return (
    <Card className="w-150 py-0">
      <CardHeader className="bg-muted/50 px-4 py-10">
        <StepsCounter />
      </CardHeader>

      <CardContent className="min-h-90">
        <form action="">
          {/* <AccountStep /> */}
          {/* <PersonStep /> */}
          <FinishStep />
        </form>
      </CardContent>

      <CardFooter className="justify-end">
        <Button size="lg" className="px-8">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}
