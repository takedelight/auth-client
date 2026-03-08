import { Button } from "./ui/button"

export const StepsCounter = () => {
  return (
    <div className="flex w-full items-center justify-center px-4">
      <div>
        <div className="relative whitespace-nowrap">
          <Button
            variant="outline"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white hover:bg-primary hover:text-white"
          >
            1
          </Button>
          <span className="absolute top-10 left-1/2 -translate-x-1/2 font-semibold">
            Account info
          </span>
        </div>
      </div>

      <div className="mx-0.5 h-1 flex-1 rounded-full bg-primary/30" />

      <div>
        <div className="relative whitespace-nowrap">
          <Button
            variant="outline"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-lg font-semibold text-black hover:bg-primary/30"
          >
            2
          </Button>

          <span className="absolute top-10 left-1/2 -translate-x-1/2 font-semibold">
            Person info
          </span>
        </div>
      </div>

      <div className="mx-0.5 h-1 flex-1 rounded-full bg-primary/30" />

      <div>
        <div className="relative whitespace-nowrap">
          <Button
            variant="outline"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-lg font-semibold text-black hover:bg-primary/30"
          >
            3
          </Button>

          <span className="absolute top-10 left-1/2 -translate-x-1/2 font-semibold">
            Finish
          </span>
        </div>
      </div>
    </div>
  )
}
